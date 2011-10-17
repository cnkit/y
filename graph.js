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
 * Graph object which contains basic information like what are the data points, max X/Y axis values,
 * type of those values among others in order to plot a graph. 
 * @class graph
 * @constructor
 * @namespace deadeye.entities
 */
deadeye.entities.graph = function () {
	this.entity_type = "deadeye.entities.graph";
	this.entity_version = "1.0";
	/**
	 * @description Minimum value on X-axis
	 * @property xMin
	 * @type long
	 */
	this.xMin = ""; 
	/**
	 * @description Minimum value on Y-axis 
	 * @property Ymin
	 * @type long
	 */
	this.yMin = "";
	/**
	 * @description Maximum value on X-axis
	 * @property xMax
	 * @type long
	 */
	this.xMax = "";
	/**
	 * @description Maximum value on Y-axis
	 * @property yMax
	 * @type long
	 */
	this.yMax = "";
	
	/**
	 * @description The type of data the X-axis represents. eg: timestamp,number,string,etc
	 * @property xType
	 * @type String
	 */
	this.xType = "";
	/**
	 * @description The type of data the Y-axis represents. eg: timestamp,number,string,etc
	 * @property yType
	 * @type String
	 */
	this.yType = "";
	/**
	 * @description The title of X-axis
	 * @property xTitle
	 * @type String
	 */
	this.xTitle = "";
	/**
	 * @description The title of Y-axis
	 * @property yTitle
	 * @type String
	 */
	this.yTitle = "";
	/**
	 * @description The set of data points needed to plot the graph
	 * @property dataPoints
	 * @type Array
	 */
     this.dataPoints = [];
     /**
 	 * @description The array contains the interval points for X-axis. If a graph has too many 
 	 * data points on the X-axis then this array would be used as it has interval points
 	 * @property xAxisLabels
 	 * @type Array
 	 */
      this.xAxisLabels = [];
      /**
   	 * @description The array contains the interval points for Y-axis. If a graph has too many 
 	 * data points on the Y-axis then this array would be used as it has interval points
 	 * @property yAxisLabels
   	 * @type Array
   	 */
        this.yAxisLabels = [];
      
	 
}