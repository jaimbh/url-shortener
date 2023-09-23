const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connect = require('./connect');
const middleware = require('./middlewares/auth');
const URL = require('./models/url');

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const PORT = 3000;

connect('mongodb://192.168.11.128:27017/short-url')
.then(()=> console.log('db connected'))
.catch((err)=> console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(middleware.checkForAuthentication);

app.use('/url', middleware.restrictTo(['NORMAL']), urlRoute);
app.use('/user', userRoute);
app.use('/', staticRoute);

app.get('/url/:shortId', async (req, res)=>{
	const shortId = req.params.shortId;
	
	const entry = await URL.findOneAndUpdate(
	{
		shortId
	},
	{
		$push: {
			visitHistory: {
				timestamp: Date.now()
			}
		}
	});
	
	res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`server started at ${PORT}`));