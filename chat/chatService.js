var chat = require('./chatModel')
var socket = require('socket.io')
async function list(req,res,next){
    await chat.find()
              .then((data,err)=>{
                if(err){
                    res.status(500).json(err)
                }
                    res.status(200).json(data)
              })
    //res.end('chat List')
}
function sockeIO(server){
    var io = socket(server)
    io.on('connection', (socket)=>{
        console.log('user connected!');
        socket.broadcast.emit("msg","A new user has connected !")//brodcast pour affiche a l'autre users connecte 
        socket.on('send-msg',async(data)=>{
            console.log(data);
            io.emit('msg',data.name+ ":" +data.msg)
            await new chat({
                msg: data.msg,
                date: new Date()
            }).save()

    }
    )

    socket.on('displaymsg',async()=>{
        var msgs =await chat.find()
       // console.log(data);
        io.emit('msgList',msgs)
    })
    })
    
 

return io;
}
function chatView(req,res,next){
    res.render('chat')

}


const create =async (req,res,next)=>{
    const { msg } = req.body 
    console.log(req.body.msg);
    await new chat({
        msg: msg,
        date: new Date()
    }).save()
      .then((data, err)=>{
          if(err){
              res.status(500).json(err)
            }
            console.log(data);
      })
      res.json('chat added ! msg : '+ msg + ' date : '+ new Date())
    
}

const update = async (req, res, next)=>{
    await chat.findByIdAndUpdate(req.params.id, req.body)
              .then((data, err)=>{
                res.json(data)
              })
}

async function deleteU(req, res, next) {
    await chat.findByIdAndDelete(req.params.id)
              .then((data, err)=>{
                if(err){
                    res.status(500).json(err)
                }
                    res.status(200).json(data)
              })
}

// Find chat by ID
const findById = async (req, res, next) => {
    const chatId = req.params.id;
    await chat.findById(chatId)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: 'chat not found' });
            }
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error finding chat', error: err });
        });
};

// Find chat by nom
const findByNom = async (req, res, next) => {
    const { nom } = req.params;
    await chat.findOne({ nom })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: 'chat not found' });
            }
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error finding chat', error: err });
        });
};



// Find chat by email
const findByEmail = async (req, res, next) => {
    const { email } = req.params;
    await chat.findOne({ email })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: 'chat not found' });
            }
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error finding chat', error: err });
        });
};

// Find chat by age
const findByAge = async (req, res, next) => {
    const { age } = req.params;
    await chat.find({ age })
        .then((data) => {
            if (data.length === 0) {
                return res.status(404).json({ message: 'No chats found with this age' });
            }
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error finding chat by age', error: err });
        });
};

module.exports = { create, list, update, deleteU, findById, findByNom, findByEmail, findByAge,sockeIO,chatView }