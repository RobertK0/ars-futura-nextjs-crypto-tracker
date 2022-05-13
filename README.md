WIP, live site [here](https://ars-futura-nextjs-crypto-tracker.vercel.app/)

Working so far:
- Fetching data
- Rendering
- Filtering by search
- Toggling favourites
- Filtering by favourites
- Pagination
- Vercel CD
- Viewing individual coin details, each on its own dynamic route

TODO:
- Definitely should use a graphing library for the price graphs, instead of mapping 168 svg containing divs for each data point and drawing svg lines between them; was curious though if I could hack it together 
- Automatic price updating every X minutes
- Mobile/responsive design
- Should refactor Coin component into smaller ones, it's messy and going to get messier
- Disable pagination or something when viewing favourites, or move those to a separate tab/page all together
- ~~Add the table head and thingies~~ done
- I should probably switch to context
- Localstorage persistence
- Individual coin info, each on its own dynamic route
- Lotsa styling, +themes
- 🤔
