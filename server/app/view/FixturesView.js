var _ = require('lodash');

exports.init = function(req, res){

	var models = req.app.db.base.models,
		encryptPassword = models.Player.encryptPassword;

	// Drop all documents
	models.Player.remove({}, function(err){});
	models.Venue.remove({}, function(err){});
	models.Match.remove({}, function(err){});
	models.Feed.remove({}, function(err){});

	// Player
	var players = [
		{
			username: 'pablodenadai',
			password: encryptPassword('123'),
			name: 'Pablo De Nadai',
			email: 'pablodenadai@gmail.com',
			gender: 'M',
			birthday: new Date('04/16/1988'),
			location: 'Melbourne, Australia',
			coordinates: [-37.7886711, 144.9390435],
			rate: 4
		},
		{
			username: 'tamatimikaere',
			password: encryptPassword('123'),
			name: 'Tamati Mikaere',
			email: 'tamati.mikaere@gmail.com',
			birthday: new Date('02/16/1992'),
			gender: 'M',
			location: 'Wellington, New Zealand',
			coordinates: [-41.2889, 174.7772],
			rate: 2
		},
		{
			username: 'anaherahine',
			password: encryptPassword('123'),
			name: 'Anahera Hine',
			email: 'anahera.hine@gmail.com',
			birthday: new Date('02/16/1992'),
			gender: 'F',
			location: 'Wellington, New Zealand',
			coordinates: [-41.2889, 174.7772],
			rate: 4
		},
		{
			username: 'ibrahimmalik',
			password: encryptPassword('123'),
			name: 'Ibrahim Malik',
			email: 'ibrahim.malik@gmail.com',
			birthday: new Date('02/20/1982'),
			gender: 'M',
			location: 'Cairo, Egypt',
			coordinates: [30.0566, 31.2262],
			rate: 3
		},
		{
			username: 'farahfawziya',
			password: encryptPassword('123'),
			name: 'Farah Fawziya',
			email: 'farah.fawziya@gmail.com',
			birthday: new Date('02/20/1985'),
			gender: 'F',
			location: 'Cairo, Egypt',
			coordinates: [30.0566, 31.2262],
			rate: 5
		},
		{
			username: 'merrillhatfield',
			password: encryptPassword('123'),
			name: 'Merrill Hatfield',
			email: 'Praesent.interdum@lectusquismassa.co.uk',
			birthday: new Date('04/16/1995'),
			gender: 'M',
			location: 'Seattle',
			coordinates: [72.26099, 109.4278],
			rate: 3
		},
		{
			username: 'declanstuart',
			password: encryptPassword('123'),
			name: 'Declan Stuart',
			email: 'nisi@dignissimMaecenas.edu',
			birthday: new Date('02/21/1986'),
			gender: 'M',
			location: 'Notre-Dame-du-Nord',
			coordinates: [29.99235, 56.7742],
			rate: 3
		},
		{
			username: 'fritzguerra',
			password: encryptPassword('123'),
			name: 'Fritz Guerra',
			email: 'nec.cursus@Fuscemollis.edu',
			birthday: new Date('10/18/1998'),
			gender: 'M',
			location: 'Pero',
			coordinates: [11.17424, -165.0595],
			rate: 2
		},
		{
			username: 'fitzgeralddowns',
			password: encryptPassword('123'),
			name: 'Fitzgerald Downs',
			email: 'arcu@pretiumaliquetmetus.net',
			birthday: new Date('04/28/1983'),
			gender: 'M',
			location: 'Saint Eugine-de-Ladrire',
			coordinates: [44.89973, 75.7080],
			rate: 3
		},
		{
			username: 'dalehouston',
			password: encryptPassword('123'),
			name: 'Dale Houston',
			email: 'ornare.egestas.ligula@loremeumetus.ca',
			birthday: new Date('01/18/1994'),
			gender: 'M',
			location: 'Kessel',
			coordinates: [67.36082, -57.4503],
			rate: 4
		},
		{
			username: 'tylersalas',
			password: encryptPassword('123'),
			name: 'Tyler Salas',
			email: 'Sed.malesuada.augue@aliquet.co.uk',
			birthday: new Date('08/25/1998'),
			gender: 'M',
			location: 'Carleton',
			coordinates: [-83.87338, 28.4334],
			rate: 2
		},
		{
			username: 'baxterharrington',
			password: encryptPassword('123'),
			name: 'Baxter Harrington',
			email: 'Nunc.quis.arcu@ipsumdolorsit.co.uk',
			birthday: new Date('05/21/1987'),
			gender: 'M',
			location: 'Alva',
			coordinates: [-14.31359, -118.0976],
			rate: 1
		},
		{
			username: 'kamalalston',
			password: encryptPassword('123'),
			name: 'Kamal Alston',
			email: 'purus.sapien@erat.co.uk',
			birthday: new Date('01/26/1996'),
			gender: 'M',
			location: 'Lauregno',
			coordinates: [80.91706, 46.1348],
			rate: 4
		},
		{
			username: 'raphaelcoffey',
			password: encryptPassword('123'),
			name: 'Raphael Coffey',
			email: 'posuere.enim@cubilia.net',
			birthday: new Date('07/22/1995'),
			gender: 'M',
			location: 'Penhold',
			coordinates: [-56.40112, -2.5266],
			rate: 3
		},
		{
			username: 'phillipgreen',
			password: encryptPassword('123'),
			name: 'Phillip Green',
			email: 'lorem.luctus.ut@magnaSed.co.uk',
			birthday: new Date('06/17/1996'),
			gender: 'M',
			location: 'Windsor',
			coordinates: [22.04139, 174.82],
			rate: 1
		},
		{
			username: 'aaronbright',
			password: encryptPassword('123'),
			name: 'Aaron Bright',
			email: 'porttitor@egestasFusce.org',
			birthday: new Date('12/23/1991'),
			gender: 'M',
			location: 'Assebroek',
			coordinates: [-21.83869, -26.5933],
			rate: 4
		},
		{
			username: 'donovanmorales',
			password: encryptPassword('123'),
			name: 'Donovan Morales',
			email: 'ac.mattis.ornare@eunulla.org',
			birthday: new Date('02/19/1991'),
			gender: 'M',
			location: 'Sauvenire',
			coordinates: [-69.45561, 164.3493],
			rate: 3
		},
		{
			username: 'kennethcalhoun',
			password: encryptPassword('123'),
			name: 'Kenneth Calhoun',
			email: 'consectetuer.adipiscing.elit@loremvitaeodio.net',
			birthday: new Date('04/29/1997'),
			gender: 'M',
			location: 'Zittau',
			coordinates: [47.65146, 112.5624],
			rate: 1
		},
		{
			username: 'russellcarver',
			password: encryptPassword('123'),
			name: 'Russell Carver',
			email: 'lobortis.nisi.nibh@fringilla.net',
			birthday: new Date('02/24/1988'),
			gender: 'M',
			location: 'Cholet',
			coordinates: [77.26414, 91.9371],
			rate: 1
		},
		{
			username: 'rudyardjordan',
			password: encryptPassword('123'),
			name: 'Rudyard Jordan',
			email: 'sem@acmieleifend.edu',
			birthday: new Date('05/15/1986'),
			gender: 'M',
			location: 'Wansin',
			coordinates: [41.65012, -63.8341],
			rate: 4
		},
		{
			username: 'driscollbeard',
			password: encryptPassword('123'),
			name: 'Driscoll Beard',
			email: 'commodo.hendrerit.Donec@feugiattellus.org',
			birthday: new Date('10/12/1986'),
			gender: 'M',
			location: 'Ceppaloni',
			coordinates: [-40.23201, -55.3086],
			rate: 4
		},
		{
			username: 'huntergilmore',
			password: encryptPassword('123'),
			name: 'Hunter Gilmore',
			email: 'eu.accumsan.sed@semper.net',
			birthday: new Date('01/07/1983'),
			gender: 'M',
			location: 'Retie',
			coordinates: [-89.53254, -66.3309],
			rate: 5
		},
		{
			username: 'malikmoore',
			password: encryptPassword('123'),
			name: 'Malik Moore',
			email: 'est@dolorNulla.org',
			birthday: new Date('02/17/1994'),
			gender: 'M',
			location: 'Bï¿½blingen',
			coordinates: [0.3975, 63.8028],
			rate: 4
		},
		{
			username: 'carlroach',
			password: encryptPassword('123'),
			name: 'Carl Roach',
			email: 'consequat@justo.edu',
			birthday: new Date('05/18/1999'),
			gender: 'M',
			location: 'Lichfield',
			coordinates: [85.24469, -106.9393],
			rate: 4
		},
		{
			username: 'wingyates',
			password: encryptPassword('123'),
			name: 'Wing Yates',
			email: 'Nunc.ullamcorper@inconsectetuer.ca',
			birthday: new Date('02/21/1995'),
			gender: 'M',
			location: 'Montebello',
			coordinates: [-75.95747, -169.5934],
			rate: 3
		},
		{
			username: 'leonardgarza',
			password: encryptPassword('123'),
			name: 'Leonard Garza',
			email: 'mauris.a.nunc@suscipitestac.edu',
			birthday: new Date('03/05/1982'),
			gender: 'M',
			location: 'La Matapdia',
			coordinates: [-33.13034, -92.6883],
			rate: 1
		},
		{
			username: 'sethlambert',
			password: encryptPassword('123'),
			name: 'Seth Lambert',
			email: 'fringilla.est.Mauris@ametorciUt.ca',
			birthday: new Date('04/09/1983'),
			gender: 'M',
			location: 'Gittingen',
			coordinates: [6.52272, 17.7965],
			rate: 1
		},
		{
			username: 'vancedunn',
			password: encryptPassword('123'),
			name: 'Vance Dunn',
			email: 'Aliquam@ligula.org',
			birthday: new Date('06/16/1985'),
			gender: 'M',
			location: 'Orciano Pisano',
			coordinates: [64.74414, -19.82],
			rate: 5
		},
		{
			username: 'erichkline',
			password: encryptPassword('123'),
			name: 'Erich Kline',
			email: 'non@arcu.org',
			birthday: new Date('08/30/1987'),
			gender: 'M',
			location: 'Sarreguemines',
			coordinates: [84.62888, 147.1007],
			rate: 5
		},
		{
			username: 'yoshioballard',
			password: encryptPassword('123'),
			name: 'Yoshio Ballard',
			email: 'augue.scelerisque.mollis@loremsemperauctor.net',
			birthday: new Date('10/28/1996'),
			gender: 'M',
			location: 'Romford',
			coordinates: [-34.4113, 68.5395],
			rate: 2
		},
		{
			username: 'coltonvalenzuela',
			password: encryptPassword('123'),
			name: 'Colton Valenzuela',
			email: 'in@utquamvel.edu',
			birthday: new Date('07/15/1990'),
			gender: 'M',
			location: 'Patalillo',
			coordinates: [-20.93578, 146.6687],
			rate: 4
		},
		{
			username: 'cobycervantes',
			password: encryptPassword('123'),
			name: 'Coby Cervantes',
			email: 'at.libero@gravidaAliquam.edu',
			birthday: new Date('05/14/1991'),
			gender: 'M',
			location: 'Guysborough',
			coordinates: [81.89574, -25.6079],
			rate: 5
		},
		{
			username: 'lesterfrank',
			password: encryptPassword('123'),
			name: 'Lester Frank',
			email: 'ut.cursus.luctus@rutrum.net',
			birthday: new Date('12/07/1982'),
			gender: 'M',
			location: 'Penicuik',
			coordinates: [29.52394, -67.8247],
			rate: 2
		},
		{
			username: 'alecbradshaw',
			password: encryptPassword('123'),
			name: 'Alec Bradshaw',
			email: 'Nunc@mollis.co.uk',
			birthday: new Date('09/11/1995'),
			gender: 'M',
			location: 'Fairbanks',
			coordinates: [32.34998, 165.9512],
			rate: 1
		},
		{
			username: 'charlesbyers',
			password: encryptPassword('123'),
			name: 'Charles Byers',
			email: 'Nulla.eu.neque@eratneque.edu',
			birthday: new Date('08/22/1992'),
			gender: 'M',
			location: 'Heule',
			coordinates: [24.88782, -172.3772],
			rate: 2
		},
		{
			username: 'aldengilbert',
			password: encryptPassword('123'),
			name: 'Alden Gilbert',
			email: 'Integer@nonmagnaNam.edu',
			birthday: new Date('02/14/1988'),
			gender: 'M',
			location: 'Sandy',
			coordinates: [72.49349, -98.3433],
			rate: 1
		},
		{
			username: 'beauware',
			password: encryptPassword('123'),
			name: 'Beau Ware',
			email: 'Curabitur@sitametmassa.com',
			birthday: new Date('10/21/1995'),
			gender: 'M',
			location: 'Pomarolo',
			coordinates: [-23.55587, 85.8866],
			rate: 5
		},
		{
			username: 'drakesavage',
			password: encryptPassword('123'),
			name: 'Drake Savage',
			email: 'aptent.taciti.sociosqu@commodo.co.uk',
			birthday: new Date('04/14/1983'),
			gender: 'M',
			location: 'Court-Saint-Etienne',
			coordinates: [64.40647, -87.0885],
			rate: 4
		},
		{
			username: 'rafaelsantos',
			password: encryptPassword('123'),
			name: 'Rafael Santos',
			email: 'sagittis.semper@milaciniamattis.org',
			birthday: new Date('02/06/1988'),
			gender: 'M',
			location: 'Grimaldi',
			coordinates: [53.24812, 126.838],
			rate: 5
		},
		{
			username: 'xavieryates',
			password: encryptPassword('123'),
			name: 'Xavier Yates',
			email: 'pede.sagittis.augue@ut.edu',
			birthday: new Date('05/16/1995'),
			gender: 'M',
			location: 'Stavoren',
			coordinates: [70.1333, 37.995],
			rate: 1
		},
		{
			username: 'ezrafitzpatrick',
			password: encryptPassword('123'),
			name: 'Ezra Fitzpatrick',
			email: 'nec.leo.Morbi@rutrumeu.net',
			birthday: new Date('10/11/1989'),
			gender: 'M',
			location: 'Strasbourg',
			coordinates: [-16.35825, 88.6756],
			rate: 5
		},
		{
			username: 'laithrowland',
			password: encryptPassword('123'),
			name: 'Laith Rowland',
			email: 'felis@mollisPhasellus.com',
			birthday: new Date('10/21/1989'),
			gender: 'M',
			location: 'Portree',
			coordinates: [-88.04483, -26.6544],
			rate: 4
		},
		{
			username: 'barryburke',
			password: encryptPassword('123'),
			name: 'Barry Burke',
			email: 'ac.turpis.egestas@ac.net',
			birthday: new Date('11/21/1988'),
			gender: 'M',
			location: 'Monmouth',
			coordinates: [64.13009, 73.0551],
			rate: 5
		},
		{
			username: 'julianwitt',
			password: encryptPassword('123'),
			name: 'Julian Witt',
			email: 'Nullam@eu.edu',
			birthday: new Date('07/25/1988'),
			gender: 'M',
			location: 'Cirencester',
			coordinates: [-89.96535, 129.4531],
			rate: 2
		},
		{
			username: 'jonahbarber',
			password: encryptPassword('123'),
			name: 'Jonah Barber',
			email: 'sed.facilisis.vitae@Curabituregestas.com',
			birthday: new Date('01/12/1986'),
			gender: 'M',
			location: 'Gillette',
			coordinates: [-81.13179, 120.1908],
			rate: 3
		},
		{
			username: 'ethanrandolph',
			password: encryptPassword('123'),
			name: 'Ethan Randolph',
			email: 'nisl.sem.consequat@Duisrisusodio.edu',
			birthday: new Date('06/15/1986'),
			gender: 'M',
			location: 'Warwick',
			coordinates: [-51.60311, 76.2155],
			rate: 4
		},
		{
			username: 'tarikhicks',
			password: encryptPassword('123'),
			name: 'Tarik Hicks',
			email: 'fringilla.mi.lacinia@imperdietnonvestibulum.net',
			birthday: new Date('12/21/1992'),
			gender: 'M',
			location: 'Wibrin',
			coordinates: [-41.81255, -83.9169],
			rate: 2
		},
		{
			username: 'bertgiles',
			password: encryptPassword('123'),
			name: 'Bert Giles',
			email: 'Lorem.ipsum@venenatislacusEtiam.net',
			birthday: new Date('06/30/1986'),
			gender: 'M',
			location: 'Villers-Poterie',
			coordinates: [58.16119, 95.0077],
			rate: 5
		},
		{
			username: 'dominicdaniel',
			password: encryptPassword('123'),
			name: 'Dominic Daniel',
			email: 'neque.sed.dictum@ultricessit.com',
			birthday: new Date('11/13/1991'),
			gender: 'M',
			location: 'Moen',
			coordinates: [-65.5963, -25.614],
			rate: 5
		},
		{
			username: 'danestevenson',
			password: encryptPassword('123'),
			name: 'Dane Stevenson',
			email: 'gravida@elementumduiquis.com',
			birthday: new Date('10/25/1987'),
			gender: 'M',
			location: 'West Vancouver',
			coordinates: [83.84154, -153.8656],
			rate: 3
		},
		{
			username: 'drewguthrie',
			password: encryptPassword('123'),
			name: 'Drew Guthrie',
			email: 'bibendum.ullamcorper.Duis@Integermollis.com',
			birthday: new Date('04/07/1988'),
			gender: 'M',
			location: 'Lochranza',
			coordinates: [-79.57225, -27.3521],
			rate: 3
		},
		{
			username: 'tatedavidson',
			password: encryptPassword('123'),
			name: 'Tate Davidson',
			email: 'eleifend.nec.malesuada@Aliquamnec.co.uk',
			birthday: new Date('05/13/1982'),
			gender: 'M',
			location: 'Forla',
			coordinates: [84.66812, -165.3876],
			rate: 5
		},
		{
			username: 'hedleydennis',
			password: encryptPassword('123'),
			name: 'Hedley Dennis',
			email: 'in.sodales@velitPellentesque.net',
			birthday: new Date('02/20/1991'),
			gender: 'M',
			location: 'Lafayette',
			coordinates: [-5.31903, 119.2709],
			rate: 5
		},
		{
			username: 'dilloncampbell',
			password: encryptPassword('123'),
			name: 'Dillon Campbell',
			email: 'tincidunt.congue.turpis@sapienNunc.org',
			birthday: new Date('04/06/1998'),
			gender: 'M',
			location: 'Forbach',
			coordinates: [88.99071, 120.0535],
			rate: 1
		},
		{
			username: 'josephfischer',
			password: encryptPassword('123'),
			name: 'Joseph Fischer',
			email: 'tempor.est.ac@arcu.org',
			birthday: new Date('02/29/1984'),
			gender: 'M',
			location: 'Novoli',
			coordinates: [38.73399, -171.1163],
			rate: 2
		},
		{
			username: 'hunterfowler',
			password: encryptPassword('123'),
			name: 'Hunter Fowler',
			email: 'vitae.nibh.Donec@mifelisadipiscing.ca',
			birthday: new Date('02/25/1991'),
			gender: 'M',
			location: 'Stewart',
			coordinates: [89.51222, -6.2613],
			rate: 3
		},
		{
			username: 'waynehall',
			password: encryptPassword('123'),
			name: 'Wayne Hall',
			email: 'Fusce@NulladignissimMaecenas.net',
			birthday: new Date('02/17/1996'),
			gender: 'M',
			location: 'Alkmaar',
			coordinates: [-23.21021, 149.8107],
			rate: 2
		},
		{
			username: 'rahimslater',
			password: encryptPassword('123'),
			name: 'Rahim Slater',
			email: 'diam.Duis.mi@eunulla.com',
			birthday: new Date('03/20/1985'),
			gender: 'M',
			location: 'Zevekote',
			coordinates: [-1.14191, -135.3414],
			rate: 5
		},
		{
			username: 'jordanduke',
			password: encryptPassword('123'),
			name: 'Jordan Duke',
			email: 'non.sapien.molestie@adipiscinglacusUt.co.uk',
			birthday: new Date('05/26/1990'),
			gender: 'M',
			location: 'Tramutola',
			coordinates: [46.50381, -130.2445],
			rate: 5
		},
		{
			username: 'troyjohns',
			password: encryptPassword('123'),
			name: 'Troy Johns',
			email: 'dui@nasceturridiculus.ca',
			birthday: new Date('09/23/1997'),
			gender: 'M',
			location: 'Oostkerke',
			coordinates: [-48.1349, -175.7871],
			rate: 3
		},
		{
			username: 'wingduffy',
			password: encryptPassword('123'),
			name: 'Wing Duffy',
			email: 'consectetuer.adipiscing.elit@Ut.ca',
			birthday: new Date('03/06/1984'),
			gender: 'M',
			location: 'North Las Vegas',
			coordinates: [-18.11109, -108.0512],
			rate: 2
		},
		{
			username: 'rogannixon',
			password: encryptPassword('123'),
			name: 'Rogan Nixon',
			email: 'at.sem.molestie@metus.co.uk',
			birthday: new Date('05/17/1986'),
			gender: 'M',
			location: 'Alcala de Henares',
			coordinates: [29.81466, -70.2135],
			rate: 3
		},
		{
			username: 'sylvesterjennings',
			password: encryptPassword('123'),
			name: 'Sylvester Jennings',
			email: 'tempus.non.lacinia@loremsemper.co.uk',
			birthday: new Date('03/06/1992'),
			gender: 'M',
			location: 'Follina',
			coordinates: [33.22533, 45.6053],
			rate: 4
		},
		{
			username: 'lesterfulton',
			password: encryptPassword('123'),
			name: 'Lester Fulton',
			email: 'leo@augue.net',
			birthday: new Date('12/13/1993'),
			gender: 'M',
			location: 'Pictou',
			coordinates: [63.61443, 88.4239],
			rate: 1
		},
		{
			username: 'eatonpollard',
			password: encryptPassword('123'),
			name: 'Eaton Pollard',
			email: 'arcu.Morbi.sit@ipsumsodales.com',
			birthday: new Date('07/07/1989'),
			gender: 'M',
			location: 'Allerona',
			coordinates: [-75.56838, 23.1261],
			rate: 4
		},
		{
			username: 'donovanmccormick',
			password: encryptPassword('123'),
			name: 'Donovan Mccormick',
			email: 'leo@nasceturridiculus.co.uk',
			birthday: new Date('07/29/1998'),
			gender: 'M',
			location: 'St. John\'s',
			coordinates: [66.94961, -47.4991],
			rate: 1
		},
		{
			username: 'arthurbarrett',
			password: encryptPassword('123'),
			name: 'Arthur Barrett',
			email: 'orci.consectetuer.euismod@nibhQuisquenonummy.co.uk',
			birthday: new Date('11/24/1982'),
			gender: 'M',
			location: 'Petropolis',
			coordinates: [29.49914, 6.4464],
			rate: 4
		},
		{
			username: 'cyrusgregory',
			password: encryptPassword('123'),
			name: 'Cyrus Gregory',
			email: 'neque.pellentesque@dictumcursusNunc.org',
			birthday: new Date('09/08/1989'),
			gender: 'M',
			location: 'Campagna',
			coordinates: [79.0366, 38.6001],
			rate: 5
		},
		{
			username: 'wyliecarson',
			password: encryptPassword('123'),
			name: 'Wylie Carson',
			email: 'Aenean.eget@Nullaeget.net',
			birthday: new Date('09/19/1994'),
			gender: 'M',
			location: 'Argenteuil',
			coordinates: [-52.67732, 97.7411],
			rate: 3
		},
		{
			username: 'ianjacobs',
			password: encryptPassword('123'),
			name: 'Ian Jacobs',
			email: 'at.nisi@iaculisquis.com',
			birthday: new Date('08/21/1997'),
			gender: 'M',
			location: 'Bastogne',
			coordinates: [52.47828, 171.6056],
			rate: 2
		},
		{
			username: 'garethboyd',
			password: encryptPassword('123'),
			name: 'Gareth Boyd',
			email: 'Proin.dolor.Nulla@condimentumeget.com',
			birthday: new Date('09/27/1986'),
			gender: 'M',
			location: 'Fort Worth',
			coordinates: [60.31787, 136.0697],
			rate: 1
		},
		{
			username: 'garthle',
			password: encryptPassword('123'),
			name: 'Garth Le',
			email: 'dolor.vitae.dolor@dolorDonec.ca',
			birthday: new Date('02/05/1985'),
			gender: 'M',
			location: 'Bonn',
			coordinates: [78.80234, 143.2636],
			rate: 1
		},
		{
			username: 'lamarwilkerson',
			password: encryptPassword('123'),
			name: 'Lamar Wilkerson',
			email: 'nec@Crasdolor.net',
			birthday: new Date('08/20/1996'),
			gender: 'M',
			location: 'Feldkirchen in Karnten',
			coordinates: [-67.19001, -69.730],
			rate: 5
		},
		{
			username: 'ericdoyle',
			password: encryptPassword('123'),
			name: 'Eric Doyle',
			email: 'et.magnis@milorem.ca',
			birthday: new Date('03/11/1996'),
			gender: 'M',
			location: 'Temuka',
			coordinates: [80.62392, 168.833],
			rate: 2
		},
		{
			username: 'trevormcknight',
			password: encryptPassword('123'),
			name: 'Trevor Mcknight',
			email: 'erat.in.consectetuer@NullaaliquetProin.co.uk',
			birthday: new Date('12/22/1993'),
			gender: 'M',
			location: 'Connah\'s Quay',
			coordinates: [6.67641, -19.0396],
			rate: 1
		},
		{
			username: 'aaronolsen',
			password: encryptPassword('123'),
			name: 'Aaron Olsen',
			email: 'commodo@tortor.net',
			birthday: new Date('04/29/1982'),
			gender: 'M',
			location: 'Township of Minden Hills',
			coordinates: [-69.39174, -81.4244],
			rate: 2
		},
		{
			username: 'fultonboyd',
			password: encryptPassword('123'),
			name: 'Fulton Boyd',
			email: 'justo.Praesent@vestibulumlorem.co.uk',
			birthday: new Date('12/08/1996'),
			gender: 'M',
			location: 'Bersillies-l\'Abbaye',
			coordinates: [-82.511, -145.3736],
			rate: 1
		},
		{
			username: 'honoratonoble',
			password: encryptPassword('123'),
			name: 'Honorato Noble',
			email: 'massa.Quisque.porttitor@arcuMorbi.com',
			birthday: new Date('03/01/1987'),
			gender: 'M',
			location: 'Villers-Poterie',
			coordinates: [85.1778, 46.9007],
			rate: 3
		},
		{
			username: 'keatonguerra',
			password: encryptPassword('123'),
			name: 'Keaton Guerra',
			email: 'quis.accumsan@Donecnibh.org',
			birthday: new Date('02/02/1988'),
			gender: 'M',
			location: 'Curitiba',
			coordinates: [-47.6071, 63.4526],
			rate: 5
		},
		{
			username: 'jamalobrien',
			password: encryptPassword('123'),
			name: 'Jamal Obrien',
			email: 'ac.fermentum.vel@nulla.org',
			birthday: new Date('07/03/1985'),
			gender: 'M',
			location: 'Brye',
			coordinates: [-17.81537, -61.6993],
			rate: 3
		},
		{
			username: 'alvinmaddox',
			password: encryptPassword('123'),
			name: 'Alvin Maddox',
			email: 'et.lacinia@Nulla.edu',
			birthday: new Date('03/17/1995'),
			gender: 'M',
			location: 'Lasnigo',
			coordinates: [83.02891, 98.3399],
			rate: 2
		},
		{
			username: 'ethankent',
			password: encryptPassword('123'),
			name: 'Ethan Kent',
			email: 'dolor@nibh.edu',
			birthday: new Date('03/31/1998'),
			gender: 'M',
			location: 'Soria',
			coordinates: [63.38604, -116.622],
			rate: 3
		},
		{
			username: 'brockatkinson',
			password: encryptPassword('123'),
			name: 'Brock Atkinson',
			email: 'natoque.penatibus.et@magnased.com',
			birthday: new Date('08/10/1998'),
			gender: 'M',
			location: 'Blois',
			coordinates: [39.15143, -105.6938],
			rate: 3
		},
		{
			username: 'cadesnow',
			password: encryptPassword('123'),
			name: 'Cade Snow',
			email: 'est@necquamCurabitur.net',
			birthday: new Date('01/22/1995'),
			gender: 'M',
			location: 'Altidona',
			coordinates: [50.66878, 155.1365],
			rate: 2
		},
		{
			username: 'ryderfigueroa',
			password: encryptPassword('123'),
			name: 'Ryder Figueroa',
			email: 'a@Donecnibh.ca',
			birthday: new Date('10/03/1982'),
			gender: 'M',
			location: 'Pirmasens',
			coordinates: [73.04432, -94.3323],
			rate: 2
		},
		{
			username: 'alvinfranks',
			password: encryptPassword('123'),
			name: 'Alvin Franks',
			email: 'libero@feugiatmetus.net',
			birthday: new Date('11/01/1998'),
			gender: 'M',
			location: 'Sauris',
			coordinates: [-35.67347, 124.96],
			rate: 5
		},
		{
			username: 'burkeduffy',
			password: encryptPassword('123'),
			name: 'Burke Duffy',
			email: 'ornare@ametconsectetuer.net',
			birthday: new Date('03/17/1988'),
			gender: 'M',
			location: 'West Ham',
			coordinates: [-43.01489, -74.6721],
			rate: 5
		},
		{
			username: 'hilelmullen',
			password: encryptPassword('123'),
			name: 'Hilel Mullen',
			email: 'luctus@Integerin.edu',
			birthday: new Date('09/28/1990'),
			gender: 'M',
			location: 'Inuvik',
			coordinates: [-59.68202, -115.4044],
			rate: 5
		},
		{
			username: 'marvinlambert',
			password: encryptPassword('123'),
			name: 'Marvin Lambert',
			email: 'lorem@urnaconvallis.org',
			birthday: new Date('09/23/1998'),
			gender: 'M',
			location: 'Warwick',
			coordinates: [-78.70708, -105.0708],
			rate: 3
		},
		{
			username: 'ianbyers',
			password: encryptPassword('123'),
			name: 'Ian Byers',
			email: 'sit@molestie.com',
			birthday: new Date('11/25/1985'),
			gender: 'M',
			location: 'Acquasanta Terme',
			coordinates: [-38.41294, 142.7600],
			rate: 5
		},
		{
			username: 'cyruspeterson',
			password: encryptPassword('123'),
			name: 'Cyrus Peterson',
			email: 'sapien.Aenean@ac.com',
			birthday: new Date('01/01/1997'),
			gender: 'M',
			location: 'Fratta Todina',
			coordinates: [43.25121, 99.8486],
			rate: 2
		},
		{
			username: 'merrittkeller',
			password: encryptPassword('123'),
			name: 'Merritt Keller',
			email: 'ultrices.posuere@ipsum.edu',
			birthday: new Date('11/15/1983'),
			gender: 'M',
			location: 'Palestrina',
			coordinates: [-74.92559, -153.8990],
			rate: 3
		},
		{
			username: 'malikrice',
			password: encryptPassword('123'),
			name: 'Malik Rice',
			email: 'in@Morbi.net',
			birthday: new Date('11/24/1983'),
			gender: 'M',
			location: 'Kelkheim',
			coordinates: [53.62846, 79.8904],
			rate: 2
		},
		{
			username: 'alvinmichael',
			password: encryptPassword('123'),
			name: 'Alvin Michael',
			email: 'tincidunt.Donec@Maurisnondui.com',
			birthday: new Date('06/04/1995'),
			gender: 'M',
			location: 'Calmar',
			coordinates: [58.87333, -41.9415],
			rate: 1
		},
		{
			username: 'hoyteverett',
			password: encryptPassword('123'),
			name: 'Hoyt Everett',
			email: 'eros.turpis.non@Sedegetlacus.net',
			birthday: new Date('06/05/1986'),
			gender: 'M',
			location: 'Porto Alegre',
			coordinates: [66.99629, -32.8805],
			rate: 4
		},
		{
			username: 'vernonporter',
			password: encryptPassword('123'),
			name: 'Vernon Porter',
			email: 'penatibus.et.magnis@Craseget.net',
			birthday: new Date('09/28/1994'),
			gender: 'M',
			location: 'Buren',
			coordinates: [82.84685, 20.3852],
			rate: 1
		},
		{
			username: 'barclaystout',
			password: encryptPassword('123'),
			name: 'Barclay Stout',
			email: 'eu@ametconsectetueradipiscing.edu',
			birthday: new Date('10/17/1994'),
			gender: 'M',
			location: 'Genova',
			coordinates: [-0.82377, 58.6167],
			rate: 4
		},
		{
			username: 'finnvinson',
			password: encryptPassword('123'),
			name: 'Finn Vinson',
			email: 'tempus.mauris@commodoipsum.org',
			birthday: new Date('08/18/1987'),
			gender: 'M',
			location: 'Lancaster',
			coordinates: [-45.79762, 69.3056],
			rate: 3
		},
		{
			username: 'murphygilliam',
			password: encryptPassword('123'),
			name: 'Murphy Gilliam',
			email: 'a.odio@et.co.uk',
			birthday: new Date('09/28/1990'),
			gender: 'M',
			location: 'Campomarino',
			coordinates: [53.8453, 122.8820],
			rate: 5
		},
		{
			username: 'hamiltonpittman',
			password: encryptPassword('123'),
			name: 'Hamilton Pittman',
			email: 'Mauris.non.dui@Donecatarcu.org',
			birthday: new Date('07/12/1999'),
			gender: 'M',
			location: 'Grado',
			coordinates: [74.5847, -133.996],
			rate: 3
		},
		{
			username: 'calebmcfadden',
			password: encryptPassword('123'),
			name: 'Caleb Mcfadden',
			email: 'mi@ultricesposuerecubilia.org',
			birthday: new Date('01/22/1983'),
			gender: 'M',
			location: 'Scena/Schenna',
			coordinates: [-18.80159, 20.5210],
			rate: 4
		},
		{
			username: 'hardingcobb',
			password: encryptPassword('123'),
			name: 'Harding Cobb',
			email: 'mus@ridiculusmusProin.co.uk',
			birthday: new Date('03/08/1999'),
			gender: 'M',
			location: 'Heusden',
			coordinates: [-65.4779, -89.0278],
			rate: 5
		},
		{
			username: 'damonschmidt',
			password: encryptPassword('123'),
			name: 'Damon Schmidt',
			email: 'imperdiet.nec.leo@a.net',
			birthday: new Date('02/06/1995'),
			gender: 'M',
			location: 'Rhisnes',
			coordinates: [29.88081, 105.8962],
			rate: 3
		},
		{
			username: 'judahshort',
			password: encryptPassword('123'),
			name: 'Judah Short',
			email: 'tempor.augue.ac@eget.org',
			birthday: new Date('01/09/1994'),
			gender: 'M',
			location: 'Grand-Leez',
			coordinates: [26.9239, -28.2077],
			rate: 5
		},
		{
			username: 'noblefrye',
			password: encryptPassword('123'),
			name: 'Noble Frye',
			email: 'metus.Vivamus.euismod@semvitaealiquam.ca',
			birthday: new Date('04/27/1988'),
			gender: 'M',
			location: 'Penticton',
			coordinates: [-50.88861, -30.9895],
			rate: 1
		}
	];

	var ps = [];
	_.each(players, function (player) {
		var p = new models.Player(player);
		p.save();
		ps.push(p);
	});

	// Venue
	var venues = [
		{
			name: 'Albert Park',
			coordinates: [-37.844054, 144.968842],
			location: 'Melbourne, Australia',
			address: '49 Convetry Street, South Melbourne',
			phone: '+61 03 9634 3452' 
		},
		{
			name: 'Maracana',
			coordinates: [-22.9122, -43.2302],
			location: 'Rio De Janeiro, Brazil',
			address: 'Rua Professor Eurico Rabelo S/N',
			phone: '+55 21 3256 1712'
		},
		{
			name: 'Camp Nou',
			coordinates: [41.3809, -2.1228],
			location: 'Barcelona, Spain',
			address: '12 Carrer d\'Aristides Maillol',
			phone: '+34 902 18 99 00'
		}
	];

	var vs = [];
	_.each(venues, function (venue) {
		var v = new models.Venue(venue);
		v.save();
		vs.push(v);
	});

	// Match
	var matches = [
		{
			description: 'South-Americans Friendly',
	        venue: vs[0].id,
			players: [
				ps[0].id,
				ps[1].id,
				ps[2].id,
				ps[3].id
			],
			price: 0, 
			organizer: ps[0].id,
			coordinates: vs[0].coordinates,
			gender: 'X',
			maxPlayers: 10
		},
		{
			description: 'Maori Football Club',
	        venue: vs[1].id,
			players: [
				ps[4].id,
				ps[1].id,
				ps[2].id,
				ps[3].id
			],
			price: 5, 
			organizer: ps[4].id,
			coordinates: vs[1].coordinates,
			gender: 'F',
			maxPlayers: 14
		},
		{
			description: 'North Melbourne Neighbours',
	        venue: vs[2].id,
			players: [
				ps[0].id,
				ps[4].id,
				ps[2].id,
				ps[3].id
			],
			price: 2.99, 
			organizer: ps[2].id,
			coordinates: vs[2].coordinates,
			gender: 'M',
			maxPlayers: 22
		}
	];

	var ms = [];
	_.each(matches, function (match) {
		var m = new models.Match(match);
		m.save();
		ms.push(m);
	});

	// Feed
	var feeds = [
		{
			player: ps[0].id,
			type: 'match',
			action: 'joined',
			venue: vs[0].id,
			match: ms[0].id,
			meta: {
				createdBy: ps[1].id,
				createdAt: new Date
			}
		}
	];

	var fs = [];
	_.each(feeds, function (feed) {
		var f = new models.Feed(feed);
		f.save();
		fs.push(f);
	});

	res.send(200, 'Fixtures created with success.');
};