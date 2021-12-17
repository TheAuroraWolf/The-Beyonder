const parseVideoRenderer = require('./parseVideoRenderer');
const parsePlaylistRenderer = require('./parsePlaylistRenderer');
const parseRadioRenderer = require('./parsePlaylistRenderer');

function parseJsonFormat(contents, json) {
    contents.forEach(sectionList => {
        try {
            if (sectionList.hasOwnProperty("itemSectionRenderer")) {
                sectionList.itemSectionRenderer.contents.forEach(content => {
                    try {
                        if (content.hasOwnProperty("channelRenderer")) {
                            json.results.push(parseChannelRenderer(content.channelRenderer));
                        }
                        if (content.hasOwnProperty("videoRenderer")) {
                            json.results.push(parseVideoRenderer(content.videoRenderer));
                        }
                        if (content.hasOwnProperty("radioRenderer")) {
                            json.results.push(parseRadioRenderer(content.radioRenderer));
                        }
                        if (content.hasOwnProperty("playlistRenderer")) {
                            json.results.push(parsePlaylistRenderer(content.playlistRenderer));
                        }
                    }
                    catch(ex) {
                        //console.error("Failed to parse renderer:", ex);
                        //console.log(content);
                    }
                });
            }
            else if (sectionList.hasOwnProperty("continuationItemRenderer")) {
                json["nextPageToken"] = sectionList.continuationItemRenderer.continuationEndpoint.continuationCommand.token;
            }
        }
        catch (ex) {
            console.error("Failed to read contents for section list:", ex);
            console.log(sectionList);
        }
    });

    return json;
}

module.exports = parseJsonFormat;