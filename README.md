# gig-finder
 **Overview**
 
  I wanted to create an app that searches for nearby gigs, based on where the user is at that time. Due to the basic CSS, an unintended output was a webpage straight out of the 90's...
 
 This app performs the following actions:
 - Gets the user's location using the API request in `geoAPI.js`
 - Lets the user search for a band/show (using Ticketmaster API) and submits using their search query.
 - The Ticketmaster API then is given the latitude and longitude of the user and puts these into a query parameter.
 - The results are stored and added as markup, along with two extra links, one that goes to the gig purchase page to buy tickets and a Youtube search, taking the search value into the URL.
 

**Challenges**

A couple of things - I really struggled to declare a variable using the `GeoAPI` component directly. I ended up taking the coordinate response and putting in on the page, then using this as the variable declaration value.
Also, the search would submit, even if there was no value, or if the API GET returned no results (spelling mistakes etc.). I added functionality to grey out the search button whenever the search field is empty.

**What next?**

Lots more I could do! There's loads of data in the Ticketmaster API e.g. Date, price.
I would like to use the coordinates directly from the component, rather than referencing the div on the page 
I've thought about adding a map of the user coordinates
