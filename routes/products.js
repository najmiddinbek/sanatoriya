import { Router } from 'express'
import Bemor from "../models/Products.js"
import Rooms from "../models/Rooms.js"
import Room from '../models/Rooms.js'
const router = Router()


router.get('/', async (req, res) => {
    const barchabemorlar = await Bemor.find().lean()
    res.render('index', {
        title: "Bosh sahifa",
        barchabemorlar: barchabemorlar,
    })
})


router.get('/products', async (req, res) => {
    const barchabemorlar = await Bemor.find().lean()
    res.render('products', {
        title: "Barcha Bemorlar",
        barchabemorlar: barchabemorlar,
    })
})
router.get('/grip', async (req, res) => {
    const barchabemorlar = await Bemor.find().lean()
    res.render('grip', {
        title: "Grip kasalini uy sharoitida davolash",
        barchabemorlar: barchabemorlar,
    })
})
router.get('/bosh-ogriq', async (req, res) => {
    const barchabemorlar = await Bemor.find().lean()
    res.render('bosh-ogriq', {
        title: "Bosh og`riq uy sharoitida davolash",
        barchabemorlar: barchabemorlar,
    })
})
router.get('/kuyish', async (req, res) => {
    const barchabemorlar = await Bemor.find().lean()
    res.render('kuyish', {
        title: "Tana Kuyishini uy sharoitida davolash",
        barchabemorlar: barchabemorlar,
    })
})
router.get('/qonash', async (req, res) => {
    const barchabemorlar = await Bemor.find().lean()
    res.render('qonash', {
        title: "Ochiq yara qonashini uy sharoitida davolash",
        barchabemorlar: barchabemorlar,
    })
})



router.get('/add', (req, res) => {
    res.render('add', {
        title: "Be'mor Qo`shish",
        errorBemorQoshish: req.flash('errorBemorQoshish')
    })
})


router.get('/all-rooms', async (req, res) => {
    const barchaxonalar = await Room.find().lean()
    res.render('davolanish', {
        title: "Davolanish",
        barchaxonalar: barchaxonalar,
        errorBemorQoshish: req.flash('errorBemorQoshish')
    })
})

router.get('/davolanish', async (req, res) => {
    const barchaxonalar = await Room.find().lean()
    res.render('davolanish', {
        title: "Be'mor Qo`shish",
        barchaxonalar: barchaxonalar,
        errorBemorQoshish: req.flash('errorBemorQoshish')
    })
})


router.get('/add-room', async (req, res) => {
    const barchaxonalar = await Room.find().lean()
    res.render('add-room', {
        title: "Xona Qo`shish",
        barchaxonalar: barchaxonalar,
    })
})


router.get("/barchabemorlar/:id", async (req, res) => {
    const id = req.params.id
    const barchabemorlarsoni = await Bemor.findById(id).populate("user").lean()
    res.render("products", {
        barchabemorlarsoni: barchabemorlarsoni,
    })
})

router.get("/edit-bemor/:id", async (req, res) => {
    const id = req.params.id
    const barchabemorlarsoni = await Bemor.findById(id).populate("user").lean()
    res.render("edit-bemor", {
        title: "Bemor malumotlarini tahrirlash",
        barchabemorlarsoni: barchabemorlarsoni,
    })
})

router.get("/see-bemor/:id", async (req, res) => {
    const id = req.params.id
    const barchabemorlarsoni = await Bemor.findById(id).populate("user").lean()
    res.render("see-bemor", {
        title: "Bemor malumotlarini ko`rish",
        barchabemorlarsoni: barchabemorlarsoni,
    })
})


router.post("/add-bemor", async (req, res) => {
    const { yangiFoydalanuvchiIsmi, yangiFoydalanuvchiFamilyasi, yangiFoydalanuvchitelefonRaqami, yangifoydalanuvchiYoshi, yashashManzili, batafsilMalumot, selectOptionJins } = req.body
    const newBemor = await Bemor.create(req.body)
    res.redirect("/")
})


router.post("/add-room", async (req, res) => {
    const { yangiXonaNarxi, yangiXonaTuri } = req.body
    const selectOptionCost = req.body.selectOptionType;
    const selectOptionType = req.body.selectOptionCost;
    const newRoom = await Rooms.create(req.body)
    res.redirect('/all-rooms')
})

router.render = ('edit-bemor', {
    title: "Bemor malumotlarini tahrirlash",
})


router.post("/edit-bemor/:id", async (req, res) => {
    const { yangiFoydalanuvchiIsmi, yangiFoydalanuvchiFamilyasi, yangiFoydalanuvchitelefonRaqami, yangifoydalanuvchiYoshi, yashashManzili } = req.body
    const id = req.params.id

    if (!yangiFoydalanuvchiIsmi || !yangiFoydalanuvchiFamilyasi || !yangiFoydalanuvchitelefonRaqami || !yangifoydalanuvchiYoshi || !yashashManzili) {
        req.flash('errorEditBemorlar', 'Barcha maydonchalarni to`ldiring...')
        res.redirect("/add")
        return
    }

    const updateBemor = await Bemor.findByIdAndUpdate(id, req.body, { new: true })
    console.log(updateBemor)

    console.log(id);
    res.redirect("/")
})



router.post("/delete-product/:id", async (req, res) => {
    const id = req.params.id

    await Bemor.findByIdAndRemove(id)
    res.redirect('/products')
})






router.post("/delete-room/:id", async (req, res) => {
    const id = req.params.id

    await Room.findByIdAndRemove(id)
    res.redirect('/all-rooms')
})

export default router