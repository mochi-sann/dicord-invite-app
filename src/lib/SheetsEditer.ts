import { GoogleSpreadsheet } from "google-spreadsheet";
import type {
  GoogleSpreadsheetWorksheet as GoogleSpreadsheetWorksheetType,
  GoogleSpreadsheet as GoogleSpreadsheetType,
} from "google-spreadsheet";

// さっき設定した環境変数
const sheetId = process.env.SHEET_ID || "";
const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "";
const privateKey = process.env.GOOGLE_PRIVATE_KEY || "";

// シートのヘッダー行の値
const sheetHeaderValues = [
  "date",
  "name",
  "email",
  "studentId",
  "discord_username",
];

export class SheetService {
  doc: GoogleSpreadsheetType;
  sheet: GoogleSpreadsheetWorksheetType | any;

  // 複数のシートを操作したい場合はconstructorの引数としてsheetIdを渡す形にするのが良さそう
  constructor() {
    //  ブラウザで呼び出した場合はエラーに（環境変数が露出するのを防ぐためにも）
    if (typeof window !== "undefined")
      throw new Error("DO NOT CALL THIS CLASS IN BROWSER!!!");
    this.doc = new GoogleSpreadsheet(sheetId);
    console.log({ sheetId, clientEmail, privateKey });
    console.log({ ...process.env });
  }

  // 本来はconstructor()の中でやりたかったがasync/awaitが使えないので仕方なく分ける
  async init() {
    await this.doc.useServiceAccountAuth({
      client_email: clientEmail,
      private_key: privateKey.replace(/\\n/g, "\n"),
    });

    // prepare for getting sheet values
    await this.doc.loadInfo();
    this.sheet = this.doc.sheetsByIndex[0];
    await this.sheet.loadHeaderRow();

    // 安全のため、シートのヘッダー行が意図している値になっているか確認する
    if (
      JSON.stringify(this.sheet.headerValues) !==
      JSON.stringify(sheetHeaderValues)
    ) {
      console.error(
        `Your sheet must have the following header columns ${sheetHeaderValues
          .map((v) => `"${v}"`)
          .join(", ")} in the exact same order.`
      );
      console.log(
        JSON.stringify(this.sheet.headerValues),
        JSON.stringify(sheetHeaderValues)
      );
      process.exit(1);
    }
  }

  // 行の一覧を取得する
  async getRows() {
    return await this.sheet?.getRows();
  }

  // 行を追加する
  async addRows(newRows: Parameters<typeof this.sheet.addRows>[0]) {
    return await this.sheet?.addRows(newRows);
  }

  // その他したい操作があれば追加する
}
