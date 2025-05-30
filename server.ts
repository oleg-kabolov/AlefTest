import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const filePath = path.resolve("./userdata/users.json");

// Интерфейс для данных
interface Parent {
  id: number;
  name: string;
  age: number;
  children: Child[];
}

interface Child {
  id: number;
  name: string;
  age: number | null;
  parentId: number;
}

type UserData = {
  parents: Parent[];
};

app.get("/api/getUserData", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as UserData;
    res.json(data);
  } catch (error) {
    console.error("Ошибка при чтении файла:", error);
    res
      .status(500)
      .json({ success: false, message: "Ошибка при чтении файла" });
  }
});

app.post("/api/updateUserData", (req, res) => {
  const newData = req.body as UserData;

  try {
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), "utf-8");
    res.json({ success: true, message: "Данные успешно обновлены" });
  } catch (error) {
    console.error("Ошибка при записи файла:", error);
    res
      .status(500)
      .json({ success: false, message: "Ошибка при записи файла" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
