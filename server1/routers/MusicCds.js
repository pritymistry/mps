const express=require('express')
const router=express.Router()
const {MusicCds} = require('../models')
const {validateToken} = require('../middleware/AuthMiddleware')

router.post('/add', validateToken, async (req, res) => {
    try {
      const {
        album_name, singer, composer_name, launch_date, place,
        genre, record_label, total_track, duration, format, price
      } = req.body;
  
      const newMusicCd = await MusicCds.create({
        album_name, singer, composer_name, launch_date, place,
        genre, record_label, total_track, duration, format, price,
        UserId: req.user.id
      });
  
      res.json(newMusicCd );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

router.get('/all',async(req,res)=>{
    const listMusicCds=await MusicCds.findAll();
    res.json(listMusicCds)
});

router.get('/allWithUsers', async (req, res) => {
  try {
    const musicCdsWithUsers = await MusicCds.findAll({
      include: Users,
    });

    res.json(musicCdsWithUsers);
  } catch (error) {
    handleErrors(res, error);
  }
});

router.get('/bySeller/Id/:id',async(req,res)=>{
    const id=req.params.id;
    const sellerData=await MusicCds.findAll({where :{UserId:id}})
    res.json(sellerData)
})

router.get('/oneMusic/Id/:id',async(req,res)=>{
    const id=req.params.id;
    const singleData=await MusicCds.findAll({where :{id:id}})
    res.json(singleData)
})

router.delete('/bySeller/Id/:id', async (req, res) => {
    try {
      const id = req.params.id;
      
      // Check if the record exists before attempting to delete
      const existingRecord = await MusicCds.findByPk(id);
      
      if (!existingRecord) {
        return res.status(404).json({ message: 'Record not found' });
      }
  
      // Record exists, proceed with deletion
      const result = await MusicCds.destroy({
        where: {
          id: id
        }
      });
  
      res.json({ message: 'Record deleted successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

router.put('/bySeller/Id/:id',validateToken,async(req,res)=>{
    const musicCdId=req.params.id;
    const { album_name, singer, composer_name,launch_date, place, genre,record_label, total_track,duration, format,price} = req.body;

    MusicCds.update({
        album_name:album_name,
        singer:singer,
        composer_name:composer_name,
        launch_date:launch_date,
        place:place, 
        genre:genre,
        record_label:record_label, 
        total_track:total_track,
        duration:duration, 
        format:format,
        price:price,
        UserId:req.user.id
    },{
        where:{id:musicCdId}
    }).then(
        res.json(req.body)
    ).catch(
        (err)=>{
            res.json({
                error:err
            })
        }
    )

})

module.exports = router