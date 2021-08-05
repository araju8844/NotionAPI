const { Client } = require("@notionhq/client")
require("dotenv").config()
const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID

async function addItem(text) {
    try {
        await notion.request({
            path: "pages",
            method: "POST",
            body: {
                parent: { database_id: databaseId },
                properties: {
                    title: {
                        title: [
                            {
                                "text": {
                                    "content": text
                                }
                            }
                        ]
                    }
                }
            },
        })
        console.log("Success! Entry added.")
    } catch (error) {
        console.error(error.body)
    }
}
async function getWeeklyTasks() {
    flkjdfsaljksdflkjsdfkj
}
async function getDailyTasks() {
    try {
        const tasksId = '6e94f201fc4a4ad7ab41cdc41a1ab814';
        var dateNow = new Date().toISOString().substr(0, 19).replace('T', ' ');
        dateNow = dateNow.split(" ")[0];

        //date = ("0" + this.getDate()).slice(-2);
        //month = ("0" + (dateNow.getMonth() + 1)).slice(-2);
        //dateString = `${dateNow.getFullYear()}-${month}-${date}`;
        const response = await notion.databases.query({
            database_id: tasksId,
            filter: {

                property: "Due Date",
                date: {
                    equals: dateNow,
                }
            },
            sorts: [
                {
                    property: 'Due Date',
                    direction: 'ascending',
                },
            ],
        });
        //console.log(response);
        console.log(response.results)
    } catch (error) {
        console.error(error.body)
    }
}
getDailyTasks()