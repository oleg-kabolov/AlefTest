import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: null,
  }),
  actions: {
    async fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/getUserData");
        if (!response.ok) throw new Error("Ошибка загрузки данных");
        this.userData = await response.json();
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    async saveData() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/updateUserData",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.userData),
          }
        );
        if (!response.ok) throw new Error("Ошибка сохранения данных");
        const result = await response.json();
        console.log(result.message);
      } catch (error) {
        console.error("Ошибка при сохранении данных:", error);
      }
    },
    addChild(parentId: number): void {
      const parent = this.userData?.parents.find((p) => p.id === parentId);
      if (!parent || parent.children.length >= 5) return;

      const newChildId = parent.children.length + 1;
      parent.children.push({
        id: newChildId,
        name: "",
        age: null,
        parentId,
      });
    },
    removeChild(parentId: number, childIndex: number): void {
      const parent = this.userData?.parents.find(
        (item: number) => item.id === parentId
      );
      if (parent && childIndex >= 0 && childIndex < parent.children.length) {
        parent.children.splice(childIndex, 1);
      }
    },
  },
});
