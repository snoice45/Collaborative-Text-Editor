
const mongoose = require("mongoose")
const Document = require("./Document")

mongoose.connect("mongodb+srv://khushi1magic:Khushi@cluster0.s9ftr14.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const io = require("socket.io")(2000, {
  cors: {
    origin: "https://collaborative-text-editor-snoice45.vercel.app/",
    methods: ["GET", "POST"]
  }
});

const defaultValue = ""

io.on("connection", socket => {
  console.log("connected")
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })
  })
})

async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: defaultValue })
}
