import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
  }

  // Convertir le fichier en buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Lire le fichier Excel
  const workbook = XLSX.read(buffer, { type: "buffer" });

  // Supposons qu’on prend la première feuille
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  return NextResponse.json(jsonData);
}
