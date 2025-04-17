import app from "./app";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
};

startServer().then(() => console.log("✅ Server started"));
