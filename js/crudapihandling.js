const crudAPIHandler = {
  apiURL: "https://crudcrud.com/api/3e97796f9a1f4bcbaaaedf0a548fdc0f/users",

  async saveUsersToAPI(user) {
    try {
      const response = await fetch(this.apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to save users data to API");
      }

      const data = await response.json();
      console.log("Users data now saved to API", data);
    } catch (error) {
      console.error("Error saving users data to API", error);
    }
  },
};
