- Set up your .env file.
  * Rename or copy .env.example to .env
  * Setup credentials

#### Configure your mongoDB server
```bash
# create the db directory
sudo mkdir -p /data/db
# give the db correct read/write permissions
sudo chmod 777 /data/db
```

- OR Use the mongo database hosted in MLAB (check env.example to get connection url)
Replace in src/app.ts line 23 MONGODB_URI_LOCAL with MONGODB_URI
 
- If using mongodb  locally start your mongoDB server
```
mongod
```
#### Installing dependencies
```
npm install
```

#### Build and run the project 
```
npm run build
npm start
```

- OR without converting ts files to js just run:
```
npm run watch
```

If you are using local and want to import the data.json provided run (it takes around 30min to complete :scream:)
```
npm run import-data
```
In order to delete it run:
```
npm run delete-data
```

#### Other
* I encourage to use at least v10.12.0 of node
* In order to run tests
```
npm run test
```

