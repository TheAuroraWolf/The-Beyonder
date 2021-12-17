const axios = require('axios');
const parseJsonFormat = require('./methods/parseJsonFormat');

const search = async (query, options) => {
    if (!query) throw new TypeError("Query cannot be null.");
    const json = { results: [] };
    let data, sectionLists = [];
    const res = await axios.get(`https://www.youtube.com/results?search_query=${query.split(" ").join("+")}`);
    const html = res.data;
    const key = html.match(/"innertubeApiKey":"([^"]*)/)[1];
    json["key"] = key;

    try {
        let match = html.match(/ytInitialData[^{]*(.*"adSafetyReason":[^;]*});/s);
        if (match && match.length > 1) {} else {
            match = html.match(/ytInitialData"[^{]*(.*);\s*window\["ytInitialPlayerResponse"\]/s);
        }
        data = JSON.parse(match[1]);
        json["estimatedResults"] = data.estimatedResults || "0";
        sectionLists = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents;
    }
    catch (ex) {
        console.error("Failed to parse data:", ex);
        console.log(data);
    }

    const j = parseJsonFormat(sectionLists, json);

    if (options && options.type.toLowerCase() === "video") {
        j.results = j.results.filter(vid => vid.video);
    } else if (options && options.type.toLowerCase() === "playlist") {
        j.results = j.results.filter(vid => vid.playlist);
    }

    return j;
}

module.exports = search;