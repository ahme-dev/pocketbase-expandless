### Pocketbase Expandless

![npm](https://img.shields.io/npm/v/pocketbase-expandless?label=latest&style=flat-square&color=red)
![npm bundle size](https://img.shields.io/bundlephobia/min/pocketbase-expandless?label=minified&style=flat-square)

This library is made to remove expands from pocketbase records, and instead set the properties inside of them as the record's properties.

This means that the regular way to access expanded fields will change from:

```typescript
product.expand.category_id;

transaction.expand.product_id.expand.category_id;
```

Into an easier way:

```typescript
product.category_id;

transaction.product_id.category_id;
```

### Install
```bash
npm i pocketbase-expandless
```

### Usage
```typescript
  // import the main function from the the library
  import { moveExpandsInline } from "pocketbase-expandless";

  // fetch your data as you would
  let transactions = await pb.collection("transactions").getList(1, 25, {
    expand: "transaction_product_ids.product_id.category_id, customer_id",
  });

  // give the list of items to the function and get a list without expands
  const itemsExpandless = moveExpandsInline(transactions.items);
  
  // use the items as you want
  items.map((item)=>{
    console.log("category with no expand = ",item.product_id.category_id)
  })
```
