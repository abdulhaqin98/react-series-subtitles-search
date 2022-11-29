import React, { useEffect, useState } from 'react'

import data from '../assets/dump.json';

const Search = () => {

   var objects = {};
   var resData = [];
   var counter = 0;

   const [loading, setLoading] = useState(true)
   const [searchResults, setSearchResults] = useState('');
   const [query, setQuery] = useState(null);

   useEffect(() => {
      // useEffect first render - refresh/load
      console.log(data.header)

      // var result = data.body.filter(obj => obj.episode == "S01E01");
      // console.log(result);


      // console.log(counter);

      // console.log(res);
   }, [])

   //  *** Main Function *** 

   const searchWord = event => {

      event.preventDefault();

      for (var i = 0; i < data.body.length; i++) {
         objects = data.body[i].data;
         // var res = searchFor("piper");
         var res = searchFor(query);

         const { series, url, episode } = data.body[i];

         var resChunk = { "series": series, "url": url, "episode": episode, "data": res }

         if (res.length > 0) {

            resData.push(resChunk);
            counter += res.length;
         }
      }

      var wordCount = { "count": counter };
      var finalData = { "header": wordCount, "body": resData };

      setSearchResults(finalData);
      setLoading(false);

      // console.log(finalData);

   }


   // // //

   function trimString(s) {
      var l = 0, r = s.length - 1;
      while (l < s.length && s[l] == ' ') l++;
      while (r > l && s[r] == ' ') r -= 1;
      return s.substring(l, r + 1);
   }

   function compareObjects(o1, o2) {
      var k = '';
      for (k in o1) if (o1[k] != o2[k]) return false;
      for (k in o2) if (o1[k] != o2[k]) return false;
      return true;
   }

   function itemExists(haystack, needle) {
      for (var i = 0; i < haystack.length; i++) if (compareObjects(haystack[i], needle)) return true;
      return false;
   }

   function searchFor(toSearch) {
      var results = [];
      toSearch = trimString(toSearch).toLowerCase(); // trim it
      for (var i = 0; i < objects.length; i++) {
         for (var key in objects[i]) {
            if (objects[i][key].toLowerCase().indexOf(toSearch) != -1) {
               if (!itemExists(results, objects[i])) results.push(objects[i]);
            }
         }
      }
      if (results.length > 0) {
         // console.log(results);
      }
      return results;
   }

   // // //

   return (
      <div className="container">

         <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
               <form onSubmit={searchWord}>
                  <div className="input-group mt-5">
                     <input type="text" className="form-control" placeholder="Word or Phrase or Metaphorical language" aria-describedby="basic-addon2" onChange={e => setQuery(e.target.value)} />
                     <div className="input-group-append">
                        <button className="btn btn-outline-warning rounded-0 rounded-end" type="submit">Search</button>
                     </div>
                  </div>
               </form>
            </div>
            <div className="col-md-4"></div>

         </div>
         {loading ? null :

            <div className="row m-2 p-2">
               <div className="col-md-2"></div>
               <div className="col-md-8" id="result">
                  <p className='text-white'>{searchResults.header.count > 0 ? searchResults.header.count : 'No Results'}</p>

                  {
                     searchResults.body.map(res => (
                        res.data.map(body => (

                           <div key={body.id} className="card my-2 py-0">
                              <div className="card-body justify-content-between py-1">
                                 <div className="d-flex justify-content-between py-1">
                                    <h6 className="card-title my-auto col-6">
                                       <a href={res.url} target="_blank" className="text-decoration-none text-dark">{res.series}</a>
                                    </h6>
                                    <p >{res.episode}</p>
                                    <p >{body.startTime}</p>
                                 </div>
                                 <p >{body.text}</p>
                              </div>
                           </div>
                        ))
                     ))
                  }
               </div>
               <div className="col-md-2"></div>
            </div>
         }

      </div>
   )
}

export default Search