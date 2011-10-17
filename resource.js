/** 
  * Substitute placeholders with string values 
  * @param {string} str The string containing the placeholders 
  * @param {Array} arr The array of values to substitute 
  */ 
function str_substitute(str, arr) { 
    var i, pattern, re, n = arr.length; 
    for (i = 0; i < n; i++) { 
        pattern = "\\{" + i + "\\}"; 
        re = new RegExp(pattern, "g"); 
        str = str.replace(re, arr[i]); 
    } 
    return str; 
}

function zeroPad(num,count) {
    var numZeropad = num + '';
    while(numZeropad.length < count) {
        numZeropad = "0" + numZeropad;
    }
    return numZeropad;
}


function StringBuffer() { 
    this.buffer = []; 
} 

StringBuffer.prototype.append = function append(string) { 
    this.buffer.push(string); 
    return this; 
}; 

StringBuffer.prototype.toString = function toString() { 
    return this.buffer.join(""); 
}; 

function genResourceFavicon(domain) {
    var paramBuffer = new StringBuffer();
  
    paramBuffer.append("cl=favicon;fi=fit;h=16;w=16");

    var y64Params = y64encode(paramBuffer.toString());
    var signature = signMd5Compute("/" + y64Params + "/" + domain, MRS_SECRET);
  
    var urlBuffer = new StringBuffer();
    urlBuffer.append(FAV_URL);
    urlBuffer.append("/api/res/1.2/");
    urlBuffer.append(signature);
    urlBuffer.append("/");
    urlBuffer.append(y64Params);
    urlBuffer.append("/");
    urlBuffer.append(domain);

    return urlBuffer.toString();
}

function genResourceUrl(origImageUrl, width, quality) {
    var paramBuffer = new StringBuffer();
  
    paramBuffer.append("cl=plain;fi=fill;q="+quality);
    paramBuffer.append(";w="+width);
    paramBuffer.append(";appid="+APP_ID_MRS);

    var y64Params = y64encode(paramBuffer.toString());
    var signature = signMd5Compute("/" + y64Params + "/" + origImageUrl, MRS_SECRET);
  
    var urlBuffer = new StringBuffer();
    urlBuffer.append(MRS_URL);
    urlBuffer.append("/api/res/1.2/");
    urlBuffer.append(signature);
    urlBuffer.append("/");
    urlBuffer.append(y64Params);
    urlBuffer.append("/");
    urlBuffer.append(origImageUrl);

    return urlBuffer.toString();
}

function genResourceUrlAbsDimension(origImageUrl, width, height, quality) {
    var paramBuffer = new StringBuffer();
  
    paramBuffer.append("cl=plain;fi=fill;q="+quality);
    paramBuffer.append(";w="+width);
    paramBuffer.append(";h="+height);
    paramBuffer.append(";appid="+APP_ID_MRS);

    var y64Params = y64encode(paramBuffer.toString());
    var signature = signMd5Compute("/" + y64Params + "/" + origImageUrl, MRS_SECRET);
  
    var urlBuffer = new StringBuffer();
    urlBuffer.append(MRS_URL);
    urlBuffer.append("/api/res/1.2/");
    urlBuffer.append(signature);
    urlBuffer.append("/");
    urlBuffer.append(y64Params);
    urlBuffer.append("/");
    urlBuffer.append(origImageUrl);

    return urlBuffer.toString();
}

function y64encode(text){
    //base on reading the yql table, it return string
    return y.crypto.encodeBase64(text).replace('+', '.').replace('/', '_').replace('=','-');
}
  
function y64decode(text){
    //base on reading the yql table, it return string
    return y.crypto.decodeBase64(text.replace('.', '+').replace('_', '/').replace('-','='));
}
  
function y64Md5encode(text) {
    return y.crypto.encodeMd5(text).replace('+', '.').replace('/', '_').replace('=','-');
}
  
function signMd5Compute(payload, secret){
    return y64Md5encode(payload + secret);
}
