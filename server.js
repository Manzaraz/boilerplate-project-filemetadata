require("dotenv").config();
const express = require("express"),
  cors = require("cors"),
  multer = require("multer"),
  upload = multer({ dest: "uploads/" }),
  app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post(
  "/api/fileanalyse",
  upload.single("upfile"),
  function (req, res, next) {
    // console.log(req.file)
    let { originalname, mimetype, size } = req.file;
    console.log({ originalname, mimetype, size });
    res.json({
      name: originalname,
      type: mimetype,
      size,
    });
  }
);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
