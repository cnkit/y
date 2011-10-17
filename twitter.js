/**
* Entity definitions in the deadeye world
* @module deadeyeEntities
*/

/*
 * Setup entities name space
 */
var deadeye = function() {
    var obj = {};
    if(deadeye) obj = deadeye;
    if(!obj.entities) obj.entities = {};      
    if (!obj.entities.twitter) obj.entities.twitter = {};
    return obj;
}();

/**
 * Genric twitter.tweet object
 * @description representation of an tweet in deadeye 
 * @class tweet
 * @constructor
 * @namespace deadeye.entities
 */
deadeye.entities.twitter.tweet = function() {
    this.entity_type = "deadeye.entities.twitter.tweet";
    this.entity_version = "1.0";

    /**
     * @description tweet id
     * @property id
     * @type String
     */
    this.id = null;
    
    /**
     * @description tweet text 
     * @property text
     * @type String
     */
    this.text = null;
    /**
     * @description created_at
     * @property createdAt
     * @type String
     */
    this.createdAt = null;
    /**
     * @description tweet creat app, i.e. TweetDeck
     * @property source
     * @type String
     */
    this.source = null;
    /**
     * @description tweet create app url
     * @property sourceURL
     * @type String
     */
    this.sourceURL = null;
    
    /**
     * @description user object
     * @property user
     * @type deadeye.entities.twitter.user
     */ 
    this.user = null;
}   
/**
 * twitter user object
 * @class user
 * @constructor
 * @namespace deadeye.entities.tweet
 */
deadeye.entities.twitter.user = function() {
    this.entity_type = "deadeye.entities.twitter.user";
    this.entity_version = "1.0";
    /**
     * @description user id
     * @property id
     * @type String
     */
    this.id = null;
    /**
     * @description screen name 
     * @property screen_name
     * @type String
     */
    this.screen_name = null; 
    
    this.profileImageURL = null;    
    
    this.name = null;
    
    /**
     * @description location i.e. New York, NY
     * @property location
     * @type String
     */
    this.location = null;
    /**
     * @description twitter user's bio.
     * @property description
     * @type String
     */
    this.description = null;  
    
    this.url = null;
    
    this.statusCount = "";
    
    this.listedCount = "";
    
    this.friendsCount = "";
    
    this.followersCount = "";
}

/*
 * Adding a validation function to articles prototype chain
 */
/*
deadeye.entities.twitter.prototype.validate = function() {
    
}

deadeye.entities.twitter.prototype.sanitize = function() {
    
}
*/

/**
 * Does YIV filtering on the article to prevent us to send back harmful data
 * @method sanitize
 */
deadeye.entities.twitter.tweet.prototype.sanitize = function() {
    /*
     * There are a few unicode chars that has proven to break the iOS 
     * parser of JSON. We'll replace them with char we know works
     */
    function sanitizeString(text) {
        if(text == null || text == 'undefined') return text;
        return text.toString().replace(/(?:\u2019|\u275C)/ig,"'");
    }
};

/**
 * Does YIV filtering on the article to prevent us to send back harmful data
 * @method sanitize
 */
deadeye.entities.twitter.user.prototype.sanitize = function() {
    /*
     * There are a few unicode chars that has proven to break the iOS 
     * parser of JSON. We'll replace them with char we know works
     */
    function sanitizeString(text) {
        if(text == null || text == 'undefined') return text;
        return text.toString().replace(/(?:\u2019|\u275C)/ig,"'");
    }
}