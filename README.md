# Pocketbase Expandless

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
