WIP, live site [here](https://ars-futura-nextjs-crypto-tracker.vercel.app/)

Content:
- [Features](#working-so-far)
- [Todo](#todo)
- [Snippets](#pieces-of-code-that-i-will-definitely-come-back-to-look-for-in-the-future)
- [Screenshots](#screenshots)

# Working so far:

- Fetching data
- Server side prop fetching and rendering
- Filtering by search
- Toggling favourites
- Filtering by favourites
- Localstorage persistence
- Pagination
- Vercel CD
- Viewing individual coin details, each on its own dynamic route
- 7d price charts

# TODO:

- ~~Definitely should use a graphing library for the price graphs, instead of mapping 168 svg containing divs for each data point and drawing svg lines between them; was curious though if I could hack it together~~ done
- Figure out how to make charts inherit fonts upon loadingdone
- ~~Automatic price updating every X minutes~~ done
- Mobile/responsive design
- Should refactor Coin component into smaller ones, it's messy and going to get messier
- ~~Disable pagination or something when viewing favourites, or move those to a separate tab/page all together~~ done
- ~~Add the table head and thingies~~ done
- I should probably switch to context
- ~~Localstorage persistence~~ done
- ~~Individual coin info, each on its own dynamic route~~ done
- Lotsa styling, + themes
- 🤔

#### Pieces of code that I will definitely come back to look for in the future:

```javascript
const [favorites, setFavorites] = useState<string[]>(
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("favourites") || "[]")) ||
      []
  );

//Checks if code is being run on server or client by checking typeof window, needs to be in quotation for some reason, if "undefined", means server, short-circuits, goes to fallback "[]", if not, gets localstorage key, which returns null if it doesn't exist, again falling back to "[]"
```

#### Screenshots:
![Screenshot](https://i.imgur.com/gKXzbUQ.png)
![Screenshot](https://i.imgur.com/o815eBu.png)
