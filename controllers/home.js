module.exports = home = (req,res,next)=>{
    res.status(200).json({message: 'welcome to kanban app'})
}