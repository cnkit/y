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
    return obj;
}();

/**
 * Image object where you can add information about the image, 
 * contains 1-n number of image instance objects where each object represent
 * a different size of the image 
 * @class image
 * @constructor
 * @namespace deadeye.entities
 */
deadeye.entities.image = function () {
    this.entity_type = "deadeye.entities.image";
    this.entity_version = "1.0";
    /**
     * @description image id
     * @property id
     * @type String
     */
    this.id = ""; 
    /**
     * @description title
     * @property title
     * @type String
     */
    this.title = "";
    /**
     * @description caption
     * @property caption
     * @type String
     */
    this.caption = "";
    /**
     * @description attribution
     * @property attribution
     * @type String
     */
    this.attribution = "";
    /**
     * @description description
     * @property description
     * @type String
     */
    this.description = "";
    /**
     * @description owner
     * @property owner
     * @type deadeye.entities.person
     */
    this.owner = null; 
    /**
     * @description pubdate (timestamp)
     * @property pubdate
     * @type long
     */
    this.pubdate = "";
    /**
     * @description image focus, used to help crop image without chopping heads off
     * @property focus
     * @type String
     */
    this.focus = "";
        
    /**
     * The geo-location for the image.
     * @property geoLocation
     * @type deadeye.entities.position
     */
    this.geoLocation = "";
    /**
     * @description Contains multiple imageInstances. 
     * There is a naming convention for each size of image, to prevent the client to go over 
     * all instances and select the right one. We are following the same naming convention 
     * flickr used for their sizes. Not all sizes need to be there, the only size that is
     * mandatory is the "original". This will also be used as the default size.<br/>   
     * <b>square</b> 75x75<br/>
     * <b>thumbnail</b>, 100 on longest side<br/>
     * <b>small</b>, 240 on longest side<br/>
     * <b>medium</b>, 500 on longest side<br/>
     * <b>large</b>, 1024 on longest side<br/>
     * <b>original</b><br/>
     * @property imageInstances
     * @type Object<imageInstance>
     */
     this.imageInstances = {}; 
}


/**
 * An image instance object, usually used in deadeye.entities.image object 
 * @class imageInstance
 * @constructor
 * @namespace deadeye.entities
 */
deadeye.entities.image.imageInstance = function () {
    this.entity_type = "deadeye.entities.image.imageInstance";
    this.entity_version = "1.0";
    this.id = "";
    /**
     * @description the height of the image
     * @property height
     * @type Integer
     */
    this.height = "";
    /**
     * @description the width of the image
     * @property width
     * @type Integer
     */
    this.width = "";
    /**
     * @description the URL to the image
     * @property url 
     * @type String
     */
    this.url = "";
}

deadeye.entities.image.imageInstance.prototype.sanitize = function() {
    
    this.url = internal.yiv.url(this.url)
    this.height = internal.yiv.number(this.height)
    this.width= internal.yiv.number(this.width)
}

/**
 * Does YIV filtering on the article to prevent us to send back harmful data
 * @method sanitize
 */
deadeye.entities.image.prototype.sanitize = function() {
    /*
     * There are a few unicode chars that has proven to break the iOS 
     * parser of JSON. We'll replace them with char we know works
     */
    function sanitizeString(text) {
        if(text == null || text == 'undefined') return text;
        return text.toString().replace(/(?:\u2019|\u275C)/ig,"'");
    }
    this.title = internal.yiv.html(sanitizeString(this.title), "text")
    this.description = internal.yiv.html(sanitizeString(this.description), "text")
    this.pubdate = internal.yiv.number(this.pubdate)
    this.id = internal.yiv.html(sanitizeString(this.id), 'text')
    this.focus= internal.yiv.html(sanitizeString(this.focus), 'text')
    this.caption= internal.yiv.html(sanitizeString(this.caption), 'text')
    this.attribution= internal.yiv.html(sanitizeString(this.attribution), 'text')
                       
    if(this.owner != null) this.owner.sanitize();   
    
    if (this.imageInstances != null && this.imageInstances.length > 0) {
        for each (imageInstance in this.imageInstances){   
            imageInstance.sanitize();
        }
    }
}        
