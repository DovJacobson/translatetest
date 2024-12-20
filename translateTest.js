
import { html } from './translate.js';

const field = {
    brusher:{
        name:             html`Name`,
        uid:              html`Individual UID`,
        subjectID:        html`SubjectID`,
        dominantHand:     html`Dominant Hand`,
        age:              html`Age`,
        birthDate:        html`Date of Birth`,
        gender:           html`Gender`,
        id:               html`Brusher ID`,
        startDate:        html`Start Date`,
        language:         html`Language`,
        locale:           html`Locale`,
        matchGame:        html`Match Game enabled`,
        points:           html`Point Balance`,
        room:             html`Current Room`,
        tutor:            html`Tutor`,
        visualBrightness: html`Screen Brightness`,
        visualSaturate:   html`Screen Saturation`,
        volumeMaster:     html`Master volume`,
        volumeVoice:      html`Voice (volume)`,
        volumeMusic:      html`Musc  (volume)`,
        volumeSFX:        html`SFX   (volume)`,
        touchup: b=> Object.assign( {}, b, {     
            age:       b.birthDate? Math.floor( (Date.now()-b.birthDate)/31556952000): html`unknown`,
            birthDate: b.birthDate? new Date(b.birthDate).toLocaleDateString( 'en-US', dateStyle ): html`unknown`,
            startDate: b.startDate? new Date(b.startDate.seconds? (1000 * b.startDate.seconds) : b.startDate ).toLocaleDateString( 'en-US', dateStyle ): html`unknown`,
            tutor:     b.tutor?     b.tutor.toUpperCase(): null,
            room:      b.room?      b.room.toUpperCase(): null,
            dominantHand: [html`left`, html`unknown`, html`right`][1+ Number(b.dominantHand)??0],
            displayName: /Our Family/i.test(b.displayName) ? html`<span class="unnamed">no name</span>` : b.displayName,
            })},
    account:{
        name:              html`Name`,
        uid:               html`Account UID`,
        displayName:       html`Display Name`,
        firstName:         html`First Name`,
        lastName:          html`Last Name`,
        email:             html`Email`,
        telephone:         html`Telephone`,
        timeZone:          html`Time Zone`,
        created:           html`First Log In`,
        lastLogin:         html`Last Log In`,
        tier:              html`Account Tier`,
        notifyReport:      html`get Progress Reports`,
        notifyReminder:    html`get Daily Reminders`,
        notifyRealtime:    html`get Remote Alerts`,
		notifySpecial:     html`get Special Offers`,
        userAgent:         html`User Agent`,
        dataUseResearch:   html`Data Use: Research`,
        dataUseNumeric:    html`Data Use: Numeric`,
        dataUsePersonal:   html`Data Use: Personal`,
        dataUseResearch:   html`Data Use: Research`,
        dataUseSocial:     html`Data Use: Social`,
        dataUseCommercial: html`Data Use: Commercial`,
        dataUseOpen:       html`Data Use: Open`,
        deviceCores:       html`Device Cores`,
        informedConsent:   html`Informed Consent`,   
        touchup: a=> Object.assign( {}, a, {     
            name:        /Our Family/i.test(a.displayName) ? (a.lastName ?? a.firstName ?? html`<span class="unnamed">no name</span>`) : a.displayName,
            displayName: /Our Family/i.test(a.displayName) ?                               html`<span class="unnamed">no name</span>` : a.displayName,
            created:   a.created?   new Date(a.created  ).toLocaleDateString( 'en-US', dateStyle ): html`unknown`,
            lastLogin: a.lastLogin? new Date(a.lastLogin).toLocaleDateString( 'en-US', dateStyle ): html`unknown`,
            userAgent: a.userAgent?.replaceAll(")",")<br/>")
            })},
    }   
    const 

        cacheBuster = ()=> `?cachebuster=${ new Date().getTime()}`,
        serverURL   = `https://us-east1-bu-pwa.cloudfunctions.net/`,   //    './';          //'http://127.0.0.1:5001/brush-up-reboot/us-central1/'//
        url = plus=>        serverURL 
                        +   plus.func.toLowerCase() 
                        +   cacheBuster()
                        +   Object.entries( plus ).filter( p=>p[0]!=="func").map( p=>`&${p[0]}=${p[1]}`).join(""), 
        gui = document.querySelector("div#accounts"),  
        fullStyle  = { timeZone: 'America/Los_Angeles', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit',                  hour12: true   },
        hdayStyle  = { timeZone: 'America/Los_Angeles', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit',                                     hour12: false  },
        hUTCStyle  = { timeZone: 'UTC',                 year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit',                                     hour12: false  },
        dateStyle  = { timeZone: 'America/Los_Angeles', year: '2-digit', month: 'short', day: '2-digit'                                                                      },
        yearStyle  = { timeZone: 'America/Los_Angeles', year: 'numeric'                                                                                                      },
        monthStyle = { timeZone: 'America/Los_Angeles',                  month: 'numeric'                                                                                    },
        timeStyle  = { timeZone: 'America/Los_Angeles',                                                  hour: '2-digit', minute: '2-digit',                   hour12: false },
        precStyle  = { timeZone: 'America/Los_Angeles',                                                  hour: '2-digit', minute: '2-digit', second:'numeric', hour12: false },
        

        add = e=> {            const 
                tar = e.target, 
                li  =   tar.closest("li"),
                id  =   li.querySelector("input.id").value,
                name=   li.querySelector("input.name").value,
                token = li.querySelector("span.token").value,
                stat  = li.querySelector(".status").value,
                status= (!stat || stat==="void") ? "ready": stat; 

            fetch(url({func:"addsubject", id, name, status}))
                .then(  show.all )
                .catch( console.error );
           },
        readyToAdd =e=> {
            const 
                tar = e.target, 
                li  = tar.closest("li"),
                btn = li.querySelector("button"),
                nm  = li.querySelector(".name"),
                id  = li.querySelector("input.id")?.value,
                name= document.querySelector(`.name[data-id="${id}"]`)?.value;
            if( name) nm.value=name;
            btn.classList.remove("hidden");
            btn.onclick = add;
          },
 
        acctFilter = {
            test:     acct=> !acctFilter.staff(acct) && !acctFilter.discover(acct) && !acctFilter.designBuild(acct),

            staff:     acct=> [
                "O0kjTLnVXOOyWvANXxTAS2ceEpJ2",   // Deeksha	Nemawarkar
                "auIfMYDxu5cSy4dMTr5nDGWMuby2",   // Joshua Orack
                "auIfMYDxu5cSy4dMTr5nDGWMuby2",   // Joshua Orack
                "V1AW6VpoQVSsPhI2a3lFZnpiqZ63",   // Lloyd	Mancl
                "lOdSy77P1uZtTvTF7Mng6N0Pnk52",   // Huy	Hoang
                "ryOlRdBBG2R8Hk8huDAgPFSk0Hs2",   // Donald	Chi`1
                "LdyVuZ2tJvQggPdicmBcYG2Srfw1",   // Alyssa
                "h2XeRnuf82QzknKSNq6WoOnhiFU2",   // Josh Yu
                "B6blnUgF4leXaFUdqt6y46DU94p1",   // Ania: 
                "4bPunpeZjJVZSudWdUtVUB87zRL2",   // Duker family (two account UIDs):
                "5AyOnR9bUISbG7ZMFvI48ruj79w1",   // Duker family (two account UIDs):
                "IED0d4850reNswdwGPaXMJNie5p1",   // Toad Nintendo (Josh): 
            ].includes(acct.uid),    
            discover:     acct=> [
                "BEINdNyegPd4YX84L0isX21zHyq2",
                "FYfxpdqIxKVYuM8YRBWE6k2f55U2",
                "G9eR20OEqdMfNCVAwpA8O9nynzg2",
                "GdsUw2VZWBdYW1xPxqt065Om9LU2",
                "N7UGjPJRv3dTOYlDSlxPXUA4Hvl1",
                "KnHHYR1FfyOKfWRUudqPIC9diXP2",
                "78jsJtxZdPRk7WgCG5SBxaKLo1j2",
                "MYfHsjvxP1gpld4XeNIy6wqgfJ73",
                "J2xfPdOn3PWCnq5vQvZAWGgWQ1c2",
                "Pt0ijvC91IeTTjqM3tEfgJeprLG3",
                "gzLK61ic79RurkY1pITwOKKZ2Ng2",
                "iMteMjO4pZPSDYw7hw0KZhTmb1X2",
                "lpaZs75SwsRrKHg0z1244vGcn853",
                "quLoHfHBeQPvYDq9ErLDa1WPsGI2",
                "whkzSSkFudZ20qzDf92BiuY5tsB2",
                "8sxT60hFPsbGOWSFoNlq7W3uXEw1",
                "YAjlHT5ws5OtpVf9Vxb6UGiZvM73",
                "pM6kJ9zUVdV4PfXJhgk5cYtw1xr1",
                "78jsJtxZdPRk7WgCG5SBxaKLo1j2",   // PC1A: 
                "B7WruPEtkZSWCS3BxcqO0FUQd393",   // PC1B: 
                "G9eR20OEqdMfNCVAwpA8O9nynzg2",   // PC1C: 
                "D6f06WQuuvgQW1dNXDJEj5oEAs22",   // PC1D (two accounts) April-June
                "kcumjWJg6XZFTimsFP53Rq5ovKe2",   // PC1E (two accounts) empty 
                "Pt0ijvC91IeTTjqM3tEfgJeprLG3",   // PC1E (two accounts) active
                "gzLK61ic79RurkY1pITwOKKZ2Ng2",   // PC2E (two brushers/profiles):     
                "kP3IbeOzQ2TY3DeFATkYRDs1SVs2",   // 152 Discover
                "EJaVLwtcT9MVxd444VH2dt9DyLp2"    // 814 Discover
            ].includes(acct.uid),    
            designBuild:     acct=> [
                "3MjWJHEFh7Ypd22q9pK3DICah0g1",
                "4p4zIlrMh5TMovb3zruycmVEXlA3",
                "B3ybA7GkkQek9tDCiZcXMOibxJH2",
                "GdPgKR0qJJOO6ig3I6HjeCOJGAC3",
                "P57Cmy4vdafe5NwedIvQVTZGif42",
                "jLBKlMmsoiRrUyMlz7ZW3cl5Ay32",
                "qvj0NqNJ1SUYgyx94SGw8y8JtqN2",
                "FYfxpdqIxKVYuM8YRBWE6k2f55U2",   // PC1D (two accounts) August-now
                "3MjWJHEFh7Ypd22q9pK3DICah0g1",   // PC2B: 
                "GdPgKR0qJJOO6ig3I6HjeCOJGAC3",   // PC2E (two brushers/profiles): 
            ].includes(acct.uid),    
        //subjects:      acct=> !acctFilter.test(acct) || !acctFilter.staff(acct),
        // designBuild:   acct=> (Number(acct.version)??0)< 1.0,
        // discovery:     acct=> (Number(acct.version)??0)>=1.0,
        },   

        forbiddenVideos = {
            D6f06WQuuvgQW1dNXDJEj5oEAs22_911:[`24.05.22.AM`, `24.05.27.AM`],                              // Elijah
            Pt0ijvC91IeTTjqM3tEfgJeprLG3_705:[`24.05.13.AM`],                                             // Paxton
            gzLK61ic79RurkY1pITwOKKZ2Ng2_944:[`24.06.03.AM`, `24.05.28.AM`, `24.05.29.AM`, `24.06.10.PM`] // Emily
            },  

        observe = selector=> new Promise( resolve=> { 
            const 
                handler = ( mutationsList, observer )=> {
                    const element = mutationsList
                        .filter( record=> record.type=="childList"       )   // only care about new children
                        .map(    record=> Array.from( record.addedNodes ))   // get the new children
                        .flat()                                              // flatten the array    
                        .find(   node=> node.matches?.(selector )         );   // find the one we want
                    if (!element) return;                       // If the element is not found, do nothing
                    observer.disconnect();                      // Stop observing once the element is found
                    resolve( element );
                    },
                observer = new MutationObserver(handler);
                observer.observe(document.body, { childList: true, subtree: true });
                }), 
            
                            

        toHalfDay= (date, UTC)=>{
            if( !date)  return null;
            let str = date.toLocaleString( 'en-US', UTC? hUTCStyle: hdayStyle );        //  "May 24, 2024, 12"
            let [all, month,day, year, hour] = /([A-Za-z]*)\s*(\d\d),\s*(\d\d\d\d),\s*(\d\d)/.exec(str);
            let hday = `${month}-${day}-${year}-${Number(hour)>11? "pm":"am"}`;
            return `${month}-${day}-${year}-${Number(hour)>11? "PM":"AM"}`;
            },

    

        cache = {},

        getSessions = id=> new Promise( (resolve, reject)=>
                cache[id]?                                       // prevent repeated queries ($$!) to database
                    setTimeout( ()=>resolve( cache[id] ), 250 )  // delay resolution to allow caller to prepare hmtl data target
                :   fetch( url({func:"getsessions", id}) )
                        .then( res=>res.json()        )
                        .then( doc=> cache[id]=doc[0] )
                        .then(  resolve               )
                        .catch( reject                ) ),     



        getGames=  id=> new Promise( (resolve, reject)=>{
                getSessions( id)
                   .then(  doc  =>{
                        if( doc.hasOwnProperty("games")) resolve( doc.games);
                            
                      const  
                        oldGame= game=>{
                                    if( !game.a  ) return null;
                                    const   
                                        rounds= new Array(5).fill().map((_, i)=> {
                                            const   time     = game.t,
                                                    answer   = game.a[i], 
                                                    choices  = game[ 'c'+i ], 
                                                    guesses  = game[ 'g'+i ], 
                                                    points   = 2 - Math.min( 2, guesses.length ),
                                                    result   = [ "lose", "halfwin", "win"][points],
                                                    duration = game.d;
                                            return { time, points, result, answer, duration, choices, guesses };
                                            }),
                                        points=   rounds.reduce( (a,b)=>a+b.points, 0),
                                        time  =   new Date(game.t),
                                        halfDay=  toHalfDay( time );
                                return { time, halfDay,  points, rounds };
                                },
                        

                        decodeRound= round=> {
                            let time = new Date( round.t ),
                                r    = round.r, 
                                answer   =   r[0],
                                duration =   r[1],
                                choices  = [ r[2], 
                                                r[3], 
                                                r[4]],
                                points   =   r[5]==answer? 2 :
                                            (r[6]==answer? 1 :
                                            (  7-r.length   )),
                                guesses  =  [r[5],r[6]].filter( x=>x!=null),
                                result   = [ "lose", "halfwin", "win"][points];
                            return { time, points, result, answer, duration, choices, guesses };
                            },

                        roundsToGames= rounds=>{
                            let round,
                                games = [],
                                game= { time:new Date(1000), rounds:[], points:0 };

                                while(  round=rounds.pop() ){
                                    if( round.time.getTime() != game.time.getTime() ){
                                        game.points = game.rounds.reduce( (a,b)=>a+b.points, 0);
                                        game.halfDay= toHalfDay( game.time );
                                        if( game.rounds.length ) games.push( game);
                                        game= { time: round.time,  rounds:[ ]};
                                        }
                                    game.rounds.push( round );           
                                    }
                                return games;
                                },  
                                 //PST////
                        oldGames = (doc.sessions??[]).filter( s=> s.a ).map( oldGame     ),
                        rounds   = (doc.sessions??[]).filter( s=> s.r ).map( decodeRound ),
                        newGames = roundsToGames( rounds ); 
                        doc.games = [ ...oldGames, ...newGames ].filter( g=>g.rounds.length );
                        resolve( doc.games );
                                   })
                    .catch( console.log );
                }),

 


        show= {


            // private variable tracks which filters are currently in use
            activeFilters: ["designBuild","discovery"],
            // html to display filters, show acttivity, count brushers that pass filters
            filters: ()=> html`
                        <div class="filters">
                            ${ Object.keys(acctFilter).reverse().map( k=> 
                                html`<label>
                                        <input class="${k}" name="${k}" id="${k}" type="checkbox" ${ show.activeFilters.includes(k)? "checked" : ""}>
                                        ${k.toUpperCase()}
                                     </label>` ).join("") } 
                        </div>`,                  

            // string to display a date in a readable format- but neglects time zone!!
            dateStr : epoch=> {          
                    if(!epoch) return html`No date`;
                    const date = new Date(epoch);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    return `${year}-${month}-${day} ${hours}:${minutes}`;
                    },

            // deprecated???
            // html to display a brusher / account property as a cell in a table        
            cell: ( {obj, key, nick, colorcode, date, json, colspan})=> html`
                <td class="${key} ${ colorcode? (obj[key]? "allow":"forbid"):""}"  colspan="${colspan??1}" >  
                    <span class="label"  > ${ nick??key }</span> 
                    <span class="${key}"> ${ 
                        /gender/i.test(key) ?  ["male","unknown","female"][1+ Number(obj[key])??0] :
                        /hand/i.test(key)   ?  ["left","unknown","right" ][1+ Number(obj[key])??0] :
                        date?  new Date( obj[key]).toLocaleString( 'en-US', fullStyle ) :
                        json?  JSON.stringify( obj[key], null, 2) :  
                                               obj[key]  } </span>
                </td>`,











                    

 /// these functions all take one or more account objects and return html to display them

            // html to view one brusher/account data as a row in a table

        account: {

            //query database and find all accounts and pass to account.page, return html
            all: ()=> fetch(url({func:"getaccounts", brief:true }))
                    .then(  res=>res.json() )
                    .then(  show.account.page )
                    .catch( console.error ),

            //display a table of all accounts and make it interactive
            page:  accts=>{
                accts= [accts].flat().map( field.account.touchup ); // always an array
                let filters = Object.keys(acctFilter).filter( f=>show.activeFilters.includes(f) );    
                
                let a= [];
                filters.forEach( f => a= a.concat( accts.filter( acctFilter[f] ) ));




                observe("table.all.brushers")
                .then(  dom=> {
                        dom.querySelector("span#count").innerHTML = dom.querySelectorAll("tr.brusher").length;
                        dom.querySelector("li.void input.id")?.addEventListener("change", readyToAdd);
                        dom.querySelector("li.void input.id")?.focus();
                        dom.querySelectorAll("tr.brusher")
                            .forEach( tr=> tr.addEventListener("click", e=>
                                show.brusher.one( e.currentTarget.dataset.uid, e.currentTarget.dataset.name)
                                .then(  html=> dom.outerHTML=html )
                                .catch( console.error )
                                )); 
                        dom.querySelectorAll(".filters input")
                            .forEach( f=>f.addEventListener("change", e=>{
                                show.activeFilters = Array.from( document.querySelectorAll(".filters input:checked"))?.map( i=>i.id);
                                dom.outerHTML =show.account.page( accts );
                                }));
                        })
                return show.account.table( a );
                },

            //html to list brusher accounts in a table full of rows
            table:  as=>  html`
                        <table class="all brushers">                                            
                        <tr class="pageheader">
                            <th colspan="8" >Brush Up Brusher Accounts</th>
                            <th colspan="2" class="total" ><span id="count">0</span> brushers</th>
                        </tr>
                        <tr><th colspan="10">${ show.filters() }</th></tr>
                        <tr>
                                <th>UWID</th>
                                <th colspan="2">Brusher</th>
                                <th>Account</th>
                                <th>UID</th>
                                <th colspan="2">Parent</th>
                                <th>Phone</th>
                                <th>Version</th>
                                <th>Kids</th>
                            </tr>
                        ${ as
                            .sort( (a,b)=>(b.subjectID  ??"")-(a.subjectID  ??""))
                            .sort( (a,b)=>(b.displayName??"")-(a.displayName??""))  
                            .map(  a=>show.account.row(a)).join("")} 
                        </table>`,

            //html to display one brusher account as a row
            row:  a =>
                a.brushers
                    .filter(b=> !b.isNew && !b.deleted) 
                    .map( (b,i, cleanedBrushers )=>html`
                        <tr class="brusher" data-uid="${b.uid}" data-name="${b.name}" > 
                            <td  class="maybe        id" >${b.subjectID                      }</td>
                            <td  class="brusher    name" >${b.name?? `<span class="unnamed">no name</span>`}</td>
                            <td  class="maybe last name" >${a.lastName                       }</td> 
                            <td  class="display    name" >${a.displayName                    }</td> 
                            <td  class="id"              >${b.uid                            }</td>
                            <td  class="first      name" >${a.firstName                      }</td> 
                            <td  class="last       name" >${a.lastName                       }</td> 
                            <td  class="last       name" >${a.telephone                      }</td> 
                            <td  class="last       name" >${a.version                        }</td> 
                            <td  lass="kids           " >${ 
                                    cleanedBrushers.length==1? "👶" :
                                    Array(i).fill("●").join("") + "👶"  +
                                    Array(cleanedBrushers.length-i-1).fill("●").join("")        } </td>
                        </tr>`).join(""),
            },









            brusher: {

                // returns promise of html
                // based on uid (and optional name) query database, find brusher and pass to page
                one: 
                    (uid,name)=> 
                        fetch( url({func:"getaccounts", ids:uid.split("_")[0]}) )
                            .then(  res=>res.json() )
                            .then(  accts => Object.assign( accts[0], accts[0].brushers.find( b=> b.uid == uid || name==b.name) ))
                            .then(  show.brusher.page ) 
                        .catch( console.error ),

                // html to display a brusher's account as a page},
                page: 
                    b=>{
                        b= field.brusher.touchup( b );

                        observe("table#brusherdetail")
                            .then(  dom=> {  
                                    dom.querySelector("li.void input.id")?.focus();
                                    dom.querySelector("li.void input.id")?.addEventListener("change", readyToAdd);
                                    dom.querySelector("button")?.addEventListener("click", ()=>show.account.all().then( html=>dom.innerHTML=html ));
                                    dom.querySelectorAll(".closed").forEach(    s=> s.addEventListener("click", e=> e.target.classList.toggle("closed") )); 
                                    });

                        return  show.brusher.table( b );
                        },





    /// these functions all take a brusher object and return html to display an aspect of that object in a table
    /// they will query the database for the data they need, and then fill in the table
    /// they will also add event listeners to the table to allow the user to interact with the data 
                table: b=>html`
                        <table id="brusherdetail">  
                        <tr>
                                <td  colspan="1" class="brusher id head"    >${b.subjectID} </td>  
                                <td  colspan="4" class="brusher name head"  >${b.name} </td>  
                            </tr><tr><td  colspan="5"    class="pic" >
                                ${ b.photoURL? `<img src=${ b.photoURL } alt="photo of ${ b.name }" >`:html`No photo available`}  </td>  
                            </tr>
                            ${ show.brusher.games( b)  }
                            ${ show.brusher.times( b)  }
                            ${ show.brusher.prizes(b)  }
                            ${ show.brusher.tweaks(b)  }
                            ${ show.brusher.profile(b) }
                            ${ show.brusher.account(b) }
                            ${ getGames(b.uid).then( console.log ) }
                            <tr><td  colspan="5" class="brusher name head"  ><button hidden>return</button></td></tr>
                        </table>`,

                // html to display one brusher as interactive (contents of) table
                // including videos, games, prizes, and account details
                // html to display one brusher's account details as a table segment
                account: a=>html`
                        <tr class="brsh acct head ">
                            <td  colspan="5" class="brsh acct head closed" >Account<span class="total"> ${a.displayName} </span> </td>
                        </tr><tr><td  colspan="5"><table>
                        ${Object.entries(field.account).map( 
                                ([key, name])=>  a[key]? html`
                        <tr>
                            <td class="field name" > ${name}  </td>
                            <td class="field value"> ${a[key]} </td>
                        </tr>`
                            :"").join("")       }
                        </table></td></tr>`,     
                        
                        
                profile: b=>html`            
                        <tr class="brsh pid head ">
                            <td  colspan="5" class="brsh pid head closed" >Profile<span class="total"> ${b.name} </span> </td>
                        </tr><tr>
                            <td  colspan="5">
                                <table>
                                    ${Object.entries(field.brusher).map( 
                                        ([key, name])=>  b[key]? html`
                                            <tr>
                                                <td class="field name" > ${name} </td>
                                                <td class="field value"> ${b[key]}</td>
                                            </tr>`
                                                :"").join("")       }
                                    </table>
                            </td>
                        </tr>`,


            // returns html framework and then, when data arrives, fills it with detailed game scores as calendar or chronological list
                games:  b=>{
                        getGames( b.uid)
                        .then(  games  =>{
                          const  
                            uniq= new Set(),
                            unique= x=> uniq.has(x)? false: (uniq.add(x), true ),
                                                                        //PST////
                            calendar =( month, year )=> {
                                    let days    = new Date( year, month+1, 0).getDate(),
                                        padding = new Date( year, month,   1).getDay(),
                                        weeks= Math.ceil( (padding+days)/7),
                                        week = 0,
    
                                        cells =             new Array( padding).fill( null )
                                                    .concat( new Array( days).fill(0).map( (_, day)=> day+1));
                                        while(  cells.length%7 ) cells.push( null );
    
                                        return html`<table class="calendar">
                                                <tr><th colspan="7"> ${[
                                                    html`January`,html`February`,html`March`,html`April`,html`May`,html`June`,html`July`,
                                                    html`August`,html`September`,html`October`,html`November`,html`December`
                                                ][month]} ${year}</th></tr>
                                                <tr>${[html`Sun`,html`Mon`,html`Tue`,html`Wed`,html`Thu`,html`Fri`,html`Sat`].map( m=>`<th >${m}</th>`).join("")}</tr>
                                                ${ new Array( weeks).fill(0).map( ( _, week)=> 
                                                    `<tr>${ new Array( 7).fill(0).map( ( _, day)=>  
                                                        //      [ week*7+day ] is a position on this month's calendar    (0-34)
                                                        // cells[ week*7+day ] is the day number at that cell (undefined, 1-31)
                                                        html`<td class="${ cells[ week*7+day ]? html`ok`:html`empty`} day">
                                                             <div class="day-number">${ cells[ week*7+day ]}</div>
                                                             <div id="${  cells[ week*7+day ]? toHalfDay( new Date( year, month, cells[ week*7+day ],  0), 'UTC'):"" }" class="am" >  </div>
                                                             <div id="${  cells[ week*7+day ]? toHalfDay( new Date( year, month, cells[ week*7+day ], 12), "UTC"):"" }" class="pm" >  </div>
                                                        </td>`).join("")}
                                                        </tr>`).join("")}
                                                    </table>`;
    
                                        },  

                            activeMonths = new Set( games.map( g=> Number( g.time.toLocaleDateString( 'en-US', monthStyle )-1 ))),
                            activeYears  = new Set( games.map( g=> Number( g.time.toLocaleDateString( 'en-US', yearStyle  )   ))),
                            dom= document.querySelector("td#games");

                            console.log( "games", {games, activeMonths, activeYears, dom});     
                                                        // draw a calendar for each month that has  games
                            dom.innerHTML= html`
                                        <button class="format">LIST</button>
                                        <div class="calendars">
                                            ${ Array.from( activeMonths ).sort().map( month=> calendar( month, 2024)).join("") }
                                        </div>`;
        
                            games.forEach( game=>{        // place each game on the calendar
                                    let dom = document.querySelector(`#${ toHalfDay( game.time ) }`); 
                                    if( dom )
                                        dom.innerHTML= html`
                                            <div class="game" data-time="${game.time.toLocaleDateString( 'en-US', dateStyle )}">
                                            <span class="points">${game.points}</span>
                                            ${ game.rounds.map( round=> html`<span class="result ${round.result}" >${"&nbsp;"}</span>`).join("") }
                                            </div>`});
                                                        // also create a simple chronological list of games
                            dom.innerHTML+= html`
                                    <ul id="gamelist" hidden="true">
                                    ${ games.reverse().map( game=>  html`
                                        <li class="game">
                                            <span class="date"  >${ toHalfDay( game.time ) }</span>
                                            <span class="time"  >${game.time.toLocaleTimeString( 'en-US', timeStyle )}</span>
                                            <span class="points">${game.points}</span>
                                            ${ game.rounds.map( round=> 
                                                    html`<span class="result ${round.result}" >${round.points}</span>`).join("") }
                                    
                                                    <span> ${ document.querySelector(`#${ toHalfDay( game.time ) }`)? "": html`NOT found` }</span>
                                                    <span> ${ unique( toHalfDay( game.time ) )? "": html`DUPLICATE` }</span>

                                        </li>`).join("")}            
                                    </ul>`;    

                            dom.querySelector("button").addEventListener("click",
                                e=> {
                                let list = dom.querySelector("ul#gamelist");
                                let cal  = dom.querySelector("div.calendars");
                                if( cal.hidden) {
                                    cal.hidden=false;
                                    list.hidden=true;
                                    e.target.innerText=html`LIST`;
                                    }
                                else {
                                    cal.hidden=true;
                                    list.hidden=false;
                                    e.target.innerText=html`CALENDAR`;
                                    }
                                }); 
                            document.querySelector( "td.games  span.total" ).innerText=   games?.length || html`None`;
                            })
                        .catch( console.log );
                    return html`
                    <tr  class="brsh games head"><td  colspan="5" class="brsh games head closed" >Scores<span class="total"></span></td></tr>
                    <tr>                         <td  colspan="5" id="games">                                                           </td></tr>`;
                    },
    
                    
                // returns html framework and then, when data arrives, fills it with a table of prize purchases
                prizes:  b=>{
                        getSessions( b.uid)
                            .then(  doc  =>{
                                document.querySelector("td#prizes").innerHTML+= html`
                                    <table id="prizes"> 
                                        <tr><th>prize</th><th>price</th><th>date</th></tr>
                                    ${doc.prizes?.map( p=> html`
                                        <tr>
                                            <td class="prize name">${p.prize}</td>
                                            <td class="price"     >${p.price}</td>
                                            <td class="date      ">${p.time?
                                            new Date( p.time ).toLocaleDateString( 'en-US', dateStyle ) : html`unknown` }</td>
                                        </tr>`).join("")}
                                    </table>`;
                                document.querySelector( "td.prizes span.total" ).innerHTML=    doc.prizes?.length?? html`None`;
                                });
                        return html`
                        <tr  class="brsh prizes head"><td  colspan="5" class="brsh prizes head closed" >Prizes<span class="total"></span></td></tr>
                        <tr>                          <td  colspan="5" id="prizes">                                                               </td></tr>`;
                        },
    
                // returns html framework and then, when data arrives, fills it with a list of gui interactions
                tweaks:  b=>{
                        getSessions(b.uid)
                            .then(doc  => {       
                                document.querySelector("td#tweaks").innerHTML+= html`
                                    <table id="tweaks"> 
                                        <tr><th>tweak</th><th>value</th><th>date</th><th>time</th></tr>
                                        ${doc.tweaks?.filter( t=>t.key ).map( t=> html`
                                        <tr>
                                            <td class="tweak name">${ t.key   }</td>
                                            <td class="value">${ Math.round(t.value*100)/100 }</td>
                                            <td class="date">${new Date( t.time ).toLocaleDateString( 'en-US', dateStyle )?? "unknown"}</td>
                                            <td class="time">${new Date( t.time ).toLocaleTimeString( 'en-US', precStyle )?? "unknown"}</td>
                                                                                        </tr>`).join("")}
                                        </table>`;
                                document.querySelector( "td.tweaks span.total" ).innerHTML=    doc.tweaks?.length?? html`None`;
                                })
                            .catch( console.error );
                        return html`
                        <tr  class="brsh tweaks head "><td  colspan="5" class="brsh tweaks head closed"  >Tweaks<span class="total"></span></td></tr>
                        <tr                           ><td  colspan="5" id="tweaks"                                                           > </td></tr>`
                        },
                times:  b=>{
                        getGames(b.uid)
                            .then(games  => {       
                                const 
                                    root  = document.querySelector("td#times"),
                                    count = document.querySelector(".times span.total"),
                                    w  = root.closest("tbody"),
                                    vw = w.innerWidth  ?? w.offsetWidth,
                                    vh = w.innerHeight ?? w.offsetHeight,
                                    n  = games?.length ?? 0;


                                root.innerHTML += html`<canvas id="graph" width="${vw}" height="${vw/1.3}"></canvas>`;
                                count.innerHTML = n>2? n : `Not enough Data Yet`;
                                if( n<3) return;
                                

                                const canvas = document.getElementById("graph");
                                const ctx = canvas.getContext?.("2d");
                                if( !ctx) return;

                                const day = 1000*60*60*24,
                                        days    = t => Math.floor( t/day ),
                                        minutes = t => Math.floor( t%(day)/(1000*60) );

                                // let times = Array.from( new Set( doc.sessions.map( s=>s.t   -8*60*60*1000   )));
                                // times=times.map( t=> Object({ minutes:minutes(t), days:days(t) }) );  

                                const times = games.map( g=>
                                           Object.assign( g, { minutes:minutes( g.time ), days:days( g.time ) }) );
                                
                                const coord ={
                                        minutes : {
                                            min:  Math.min( ...times.map( t=>t.minutes )),
                                            max:  Math.max( ...times.map( t=>t.minutes )),
                                            },
                                        days    : {
                                            min:  Math.min( ...times.map( t=>t.days    )),
                                            max:  Math.max( ...times.map( t=>t.days    )),
                                            },
                                        x:  { 
                                            min: 0, 
                                            max: canvas.width,
                                            margin: 40
                                            },
                                        y:  {
                                            min: 0,
                                            max: canvas.height,
                                            margin: 40
                                            },
                                        };    

                                    coord.minutes.min  = (Math.floor( coord.minutes.min/60)-1)*60; // start at least an hour earlier
                                    coord.minutes.max  = (Math.ceil(  coord.minutes.max/60)+1)*60; // end at least an hour later
                                    coord.minutes.range = coord.minutes.max - coord.minutes.min; 
                                    coord.days.range    = coord.days.max    - coord.days.min;
                                    coord.x.range       = coord.x.max       - coord.x.min - 2*coord.x.margin;
                                    coord.y.range       = coord.y.max       - coord.y.min - 2*coord.y.margin;
                                    coord.x.scale       = coord.x.range     / coord.days.range;
                                    coord.y.scale       = coord.y.range     / coord.minutes.range;

                                    
                                    const em=  Math.round( coord.x.scale )/2;
                                    const steelblue = "70, 130, 180"; // steelblue with 30% opacity
                                    const steelrust = "185, 125,  75"; // anti-steelblue with 30% opacity
                                        
                                    // thin black lines
                                    ctx.font = `${em}px Arial`; // Font size and family
                                    ctx.fillStyle = 'black'; // Text color

                                    ctx.strokeStyle = "rgb(235 235 250 )";

                                  
                               
                                    for( let d=coord.days.min; d<=coord.days.max; d++ ) {
                                        let x= Math.round(( d- coord.days.min)*coord.x.scale + coord.x.margin);
                                        let date = new Date( d*day);
                                        let dom = date.getUTCDate();
                                        let dow = date.getUTCDay();
                                        let mon = date.getUTCMonth();
                                        let month = html`JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER`.split(",")[mon];
                                        ctx.strokeStyle = `rgb( ${dow==0||dow==6? steelrust : steelblue}, ${0.3-0.2*(dom/30)})`;
                                        ctx.lineWidth = coord.x.scale-4;
                                        ctx.beginPath();
                                        ctx.moveTo(x, coord.y.margin);
                                        ctx.lineTo(x, coord.y.max);
                                        ctx.stroke();

                                        ctx.textAlign = 'center';
                                        ctx.fillText( dom, x,2*em); // Text, x-coordinate, y-coordinate
                                        ctx.textAlign = 'left';
                                        if( dom==1) ctx.fillText( month, x, em);
                                        }   

                                ctx.strokeStyle = "steelblue";
                              //  ctx.strokeStyle = "white";


                                for( let m=coord.minutes.min; m<=coord.minutes.max; m+=60 ) {
                                    let y= Math.round(( m- coord.minutes.min)*coord.y.scale + coord.y.margin);

                                    ctx.lineWidth = (m%(12*60)==0)? 4 : ((m%(6*60)==0)? 3 : ((m%(2*60)==0)?  2 : 1) );
                                    ctx.beginPath();
                                    ctx.moveTo( coord.x.margin, y);
                                    ctx.lineTo( coord.x.max-coord.x.margin,    y);
                                    ctx.stroke();
                                    ctx.textAlign = 'right';
                                    ctx.fillText( (m/60-1)%12+1, em, y+3); // Text, x-coordinate, y-coordinate
                                    }   
                                
                                const markPoint = t=>{
                                    let x = Math.round((t.days   - coord.days.min   )*coord.x.scale + coord.x.margin),
                                        y = Math.round((t.minutes- coord.minutes.min)*coord.y.scale + coord.y.margin),
                                        s=      Math.max( 5, Math.round( coord.x.scale -5 )),
                                        score = Math.max( 0, t.points-5), // range from 0 (random) to 5 (perfect) 
                                        hue =   score * 30,     // range from 0 (red) to 120 (green)
                                        lum =   score *  7 + 25, // range from 25 (dark) to 650 (light)`
                                        color = `hsla(${hue}, 100%, ${lum}%, 0.5)`;

                                    ctx.fillStyle = color;
                                    ctx.strokeStyle = score==5? "darkgreen":"steelblue";
                                    ctx.lineWidth   = score==5? 3:2;
                                
                                    ctx.beginPath();
                                    ctx.arc(x, y, s / 2, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle
                                    ctx.fill();
                                    ctx.stroke();
                                }
                                
                        ctx.fillStyle = "rgb(255 0 200 / 50%)";
               
                        // for( let i= 0; i<=1; i+=.01 ) { 

                        //     markPoint({ days:    coord.days.min    + i * coord.days.range, 
                        //                 minutes: coord.minutes.min + i * coord.minutes.range });
                        //     }



                                ctx.fillStyle = "rgb(0 100 200 / 50%)";
                                times.forEach(markPoint);       

                                // console.log({ doc, times});
                    
                                // ctx.fillStyle = "rgb(200 0 0)";
                                // ctx.fillRect(10, 10, 50, 50);
                    
                                // ctx.fillStyle = "rgb(0 0 200 / 50%)";
                                // ctx.fillRect(30, 30, 50, 50);
                                })
                            .catch( console.error );
                        return html`
                        <tr  class="brsh times head "><td  colspan="5" class="brsh times head closed"  >Times<span class="total"></span></td></tr>
                        <tr                          ><td  colspan="5" id="times"                                                           > </td></tr>`
                        },
    

            },
            

            // returns html framework of an abstracted dental chart- then, when data arrives, fills it with lists of video for each bruushing station
            child: b=>html`
                <div class="column fullscreen child exam">
                        ${ b.photoURL? 
                            html`<img class="pic" src=${ b.photoURL } alt="photo of ${ b.name }" >` :
                            html`<div class="pic"> No photo available 
                                </div>`    }
                        <div class="brusher name head" >${b.name} 
                            </div>  
                        <div class="row tabs">
                            <div class="tab"> history  </div>
                            <div class="tab"> progress </div>
                            <div class="tab"> prizes  </div>
                            </div>
                        <div class="content">
                            <div class="buicon"></div>
                                </div>
                            </div> 
                            `,












                            
            wait: msec=> new Promise( resolve=> resolve(  html`<div> <span> Loading... </span> </div>`))

             };
    export default show;
