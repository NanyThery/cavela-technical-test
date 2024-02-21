This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation

1. Install packages

```bash
npm install
#or

yarn install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About this exercise

### Development enviroment

- Language: React with Next.Js - This app was built using Next.js and applying, whenever possible, the server side rendering and server components. Server components and SSR allow faster UIs, managing the fetch operations and mutations in a very light way. Amongst other useful tools like routing and API building.
- Deployment: the app has been deployed on Vercel using Github repository as source.
- Styling: for the vast majority of the project, the styling is done through CSS Modules, to allow a fast and more accurate building of the UI according to the specs provided. Despite the library `Mantine` was added, only the `Modal` implementation was used.
- Testing: testing is done with Jest and React Testing Library

### Decisions

- Since we don't have a real database or API to interact with, we have to deal with state in some interfaces, like the `Card Grid`. However, in a real production environment we could deal real-time with the database and allow for UI updates from the server, without the need to handle state on the client.

- Instead of launching the "edition" pop up when clicking on the card, I implemented an "Edit" button, next to the "add to my quotes" button. From a UX perspective, all the actions related to an element should be grouped together and be obvious to the user. The "delete" button should also be in the actions area, however I implemented the "x" icon.

- The following instruction was not implemented:

  > If you deselect all items and click “apply”, the card is removed.

      - The deletion of an item should be more obvious. So the removal should either be implemented:
        - Inside the modal with a clear "Delete" button.
        - Outside the modal with a clear "Delete" button amongst the actions to be performed with

- Responsive design: The app has a responsive design whenever possible. The modal popup has sort of an adaptation, since this was not in the scope of this task, I didn't dig further in adapting the modal tables to the mobile view. However, the design needs adjustments in order to work properly. Working with tabular data is always a challenge in small screens.

### Data structure considerations

Even though we don't have a "backend for frontend" API policy, in this case, it would be recommendable to have only two endpoints that returned the information grouped by supplier and included the supplier info at a top level. This structure is easier/faster/cost-effective to compose at backend, with direct queries to the database than recreating the structure from the frontend.

1. Quotes

These are the custom quotes that users created. They can only refer to items of a single supplier (according to the specs), and they cannot combine multiple choices from different suppliers. That means that we can be sure that each quote has items from a single supplier.

So, the quotes should also include the necessary information from the supplier as well. These prevents that the fronted has to make a call for EACH quote_item when they all belong to the same supplier. Even thought we know that quotes belong to a single supplier, fronted does not know which one is it, and this information is nested within the `quote_items`.

```json
[
  {
    "quote_items": [
      "1be92e49-98a0-44e6-a9d4-7a9fd480b22c",
      "1be92e49-98a0-44e6-a9d4-7a9fd480b22c"
    ],
    "supplier": {
      "name": "Supplier 1",
      "id": "xxx-xxx-xxx",
      "rating": 4.9
    },
    "badges": [
      ["reviews", 1],
      ["cost", 2]
    ]
  },
  {
    "quote_items": [
      "1be92e49-98a0-44e5-a9d4-7a9fd480b22c",
      "1be92e49-98a0-44e6-a9d4-7a9fd480b22a"
    ],
    "supplier": {
      "name": "Supplier 2",
      "id": "xxx-xxx-xxx",
      "rating": 4.9
    },
    "badges": [["cost", 1]]
  }
]
```

2. Quote Items:

Quote items are visually grouped by supplier, and also the selection is restricted in that sense. Given the current data structure coming from the endpoints we'd need to first quote all the `quote_items` then fetch for EACH item, the information of the `supplier` with the id stored. And then create a frontend grouping from the bottom up.

This forces data grouping that could be avoided on the frontend, besides the extra cost of fetching data multiple times when it's not needed.

Quote items could be delivered by the endpoint already grouped by supplier, including the supplier info at a top level:

```json
{
  "suplier-1-id": {
    "name": "Supplier 1",
    "score": 4.5,
    "quotationItems": [
      {
        "quoteItemId": "1",
        "variant": "Variant 1",
        "moq": 100,
        "quantity": 1000,
        "unitCost": "£100",
        "leadTime": "1 week",
        "sampleCost": "£100",
        "badges": ["badge1", "badge2"],
        "cavelasChoice": true
      },
      {
        "quoteItemId": "2",
        "variant": "Variant 2",
        "moq": 200,
        "quantity": 2000,
        "unitCost": "£200",
        "leadTime": "2 weeks",
        "sampleCost": "£200",
        "badges": ["badge3", "badge4"],
        "cavelasChoice": false
      }
    ]
  }
}
```

### UX Suggestions

On the quotations popup, It's not obvious to the user why some options are grayed out or disabled, since all the information is presented together.

Probably a "Tabs" structure where each tab is for one supplier's quotation items, would be more helpful for the users. It could be also be of help a hint text specifying this.
