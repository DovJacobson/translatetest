

var lang="es",            // two-letter code for current target language
    currentContext="";    // used internally to store context for third-party translation (eg: context-aware translation API)

const  
  dictionary= {          // collection of individual dictionary of translations by language
    es: { JIM:"Jaime" }, // Spanish dictionary
    },

  context={},            // collection of context strings that match each dictionary entry
  

  
  
  
  // makeKey: 
  //     returns a 'normalized key' for any given text string 
  
  makeKey = text => 
       (  /^\W*(.*)/i.exec(                               // trim non-alphanumeric from start of line
                        /(.*?)\W*$/i.exec(text)?.[1]??""  // trim non-alphanumeric from end of line
                        )?.[1]??"" )
                        .replace("nbsp;", " ")            // replace non-breaking space with space 
                        .replace( /\s+/g, ' ')            // replace multiple spaces with one space
                        .toUpperCase(),                   // flatten case



// translateText:  
//     returns the translation of a given text string from existing dictionary
//     if no translation is found
//     creates new empty entry in the dictionary, stores context, and returns original text  

  translateText = text => {
    let key = makeKey(text);
    if ( dictionary[lang]?.[key] ) return dictionary[lang][key].toUpperCase();
    if( !dictionary[lang] ) dictionary[lang] = {};
    dictionary[lang][key] = null;
    context[key]          = currentContext;
    return text.toUpperCase(); 
    },

 


// translateStrings:
//     returns an array of translated strings from an array of strings
//     without changing any html tags, even if the tag is divided among multiple strings

  translateStrings = strings => {

    let inTag=false;

    return strings.map( s => {
        const regex = /(?<tagOpen><?)(?<content>[^<>]*)(?<tagClose>>?)/g;
        let str="", groups;  
   
        while (  groups = regex.exec( s )?.groups ) {
            let { tagOpen, content, tagClose } = groups,
                tag='',
                text='';
            if( !tagOpen && !content && !tagClose ) break;
            if( inTag  )         tag =           content + tagClose; 
            else if( tagOpen )   tag = tagOpen + content + tagClose;            
            else                 text=           content;
            str += translateText(text) + tag;
            inTag = !!tag && !tagClose;
            }
        return str;
        })
        },



// parseTemplate: (standard template processor)
//     returns a string with interpolated values

parseTemplate = ( strings, ...values ) => 
        strings.map( (str, i) =>  str + (values[i] ?? '')).join(''),




// translateTemplate:  (specialized template processor)
//     returns a string with interpolated values and translated text and untouched html tags

  translateTemplate = ( strings, ...values) => {
    currentContext =  parseTemplate( strings, ...values ).replaceAll(/<[^>]*>/g, '').replace(/\s+/g, ' ') ; 

    return parseTemplate( translateStrings(strings), ...values);
    },



// html: (alias for translateTemplate)
//     it is named 'html' only so it triggers the VS Code colorizer to treat its content as html 

  html = translateTemplate,



  selftest = () => {  
    console.log( { ...dictionary.es } );

    console.log( "   straight text:          ",
                                   ` Jim!`                  );
    console.log( "         makekey:          ",
                           makeKey(` Jim!`  ) );
    console.log( "   straight text:          ",
                                   ` Jim!`    );
    console.log( "   translateText:          ",     
                     translateText(` Jim!`  ) );
    console.log( "   straight text:          ",       
                                   `Hey, you must pay!`    );
    console.log( "   translateText:          ",
                     translateText(`Hey, you must pay!`  ) );
    console.log( "    parseTemplate:          ",     
                      parseTemplate`<div>Hey, you <span class= "bold"> must pay </span> ${Math.floor(Math.random()*1000)} dollars to my brother, <b>Jim</b>!</div>`  );
    console.log( "translateTemplate:          ", 
                  translateTemplate`<div>Hey, you <span class= "bold"> must pay </span> ${Math.floor(Math.random()*1000)} dollars to my brother, <b>Jim</b>!</div>`  );
    console.log( "             html:          ",              
                               html`<div>Hey, you <span class= "bold"     > must pay </span>${Math.floor(Math.random()*1000)} dollars to my brother, <b>Jim</b>!</div>` );
    console.log( "             html:          ",  
                               html`<div>Hey, you <span class= "${'bold'}"> must pay </span>${Math.floor(Math.random()*1000)} dollars to my brother, <b>Jim</b>!</div>` );

    console.log( {dictionary, context} );
    }


selftest();

export { html, lang, dictionary, context };


