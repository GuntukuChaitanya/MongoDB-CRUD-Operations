const {MongoClient}=require('mongodb');

async function main(){
    const uri = "mongodb+srv://chaitanyaGuntuku:ms94gc99$@cluster0.p3lyw.mongodb.net/KnownContactList?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
    await client.connect();

    // Listing Databases
    // await listDatabases(client);

    // Creating List with insertOne
    // await createLists(client, {
    //     name: "Guntuku Chaitanya",
    //     contact: 9550997612
    // })

    // Creating Lists with insertMany
    // await createMultipleLists(client,[
    //     {
    //         name: "Aravind Koganti",
    //         contact: +1-501-4266,
    //     },
    //     {
    //         name: "Adithya Maringanti",
    //         contact: 8179074760,
    //     },
    //     {
    //         name: "Shiva Keshav",
    //         contact: +1-763-4704,
    //     }
    // ]  )

    // Reading List
    // await findList(client,"Guntuku Chaitanya");
    

    // Updating Documents
    // await updateList(client,"Aravind Koganti",{contact: 9705069715});

    //Upserting Documents
    // await upsertList(client, "Surya", {name: "Surya",contact: 9703627316});

    // await upsertList(client, "Sri Bhargav", {name: "Sri Bhargav",contact: 8374000796})


    //Update Multiple Lists
    // await updateAgeinList(client);
    
    //Deleting Lists
    await deleteOneList(client ,"Surya");

    } 
    catch(e){
        console.error(e);
    } 
    finally{
        await client.close();
    }
}

main().catch(console.error);

//Deleting Lists
async function deleteOneList(client,listName){
    const deleteList=await client.db("KnownContactList").collection("KnownFriends").deleteOne({name:listName});

    console.log(deleteList.deletedCount+" Documents deleted");
}

//Updating Lists
async function updateAgeinList(client){
    const updateMulDoc=await client.db("KnownContactList").collection("KnownFriends").updateMany({age: {$exists: false}}, {$set :{age: "Unknown"}});

    console.log(updateMulDoc.matchedCount+" Matched Documents");
    console.log(updateMulDoc.modifiedCount+" Updated Documents");
}

async function upsertList(client, existList,updateList){
    const updateDoc=await client.db("KnownContactList").collection("KnownFriends").updateOne({name:existList}, {$set: updateList}, {upsert: true});

    console.log(updateDoc.matchedCount+" Matched Documents");
    if(updateDoc.upsertedCount>0){
    console.log(" Document Inserted with Id:"+updateDoc.upsertedId);
    }
    else{
        console.log(updateDoc.modifiedCount+" Updated Documents");
    }
} 

async function updateList(client,existList,updateList){
    const updateDoc=await client.db("KnownContactList").collection("KnownFriends").updateOne({name:existList}, {$set: updateList});
    console.log(updateDoc.matchedCount+" Matched Documents");
    console.log(updateDoc.modifiedCount+" Updated Documents");
}

//Finding List
async function findList(client,listName){
    const findDoc = await client.db("KnownContactList").collection("KnownFriends").findOne({name:listName});
    if(findDoc){
        console.log("Found List "+listName);
        console.log(findDoc);
    }
    else{
        console.log("No Listing with "+listName);
    }
}

//Creating Lists
async function createLists(client, newList) {
    const newDoc = await client.db("KnownContactList").collection("KnownFriends").insertOne(newList);
    console.log("New Listing Created with the following id:" + (newDoc.insertedId) );
}

async function createMultipleLists(client,newList){
    const newDoc = await client.db("KnownContactList").collection("KnownFriends").insertMany(newList);
    console.log("No.Of new Listing Created" + (newDoc.insertedCount) + "with following id's:");
    console.log(newDoc.insertedIds);
}

// Listing Databases
async function listDatabases(client){
    const allDatabases= await client.db().admin().listDatabases();

    console.log("My Databases: ");
    allDatabases.databases.forEach(db => {
        console.log(db.name);
    });
}