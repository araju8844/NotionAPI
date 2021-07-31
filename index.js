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
async function getDailyTasks() {
    try {
        const tasksId = '6e94f201fc4a4ad7ab41cdc41a1ab814';
        const dateNow = Date.now();
        const response = await notion.databases.query({
            database_id: tasksId,
            filter: {

                property: "Due Date",
                date: {
                    equals: "2021-07-30",
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
        console.log(response.results[0].properties["Context"])
    } catch (error) {
        console.error(error.body)
    }
}
getDailyTasks()