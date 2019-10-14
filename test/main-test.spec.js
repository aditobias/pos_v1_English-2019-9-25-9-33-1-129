'use strict';

const defaultPos = require("../main/main");

describe('pos', () => {

  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    defaultPos.printReceipt(tags);

    const expectText = `***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
----------------------
Total：58.50(yuan)
Discounted prices：7.50(yuan)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });

  it('should decode barcode based on the barcode tags given', () => {

    const tags = [
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];


    const decodedTags = defaultPos.decodeTags(tags);

    const expectText = [
      {barcode: 'ITEM000003', count : '2.5'},
      {barcode: 'ITEM000005', count : '1'},
      {barcode: 'ITEM000005', count : '2'}
    ];

    expect(decodedTags).toStrictEqual(expectText);
  });

  it('should load the items from loadItems function based on the input barcode', () => {

    const tags = [
      {barcode: 'ITEM000003', count : '2.5'},
      {barcode: 'ITEM000005', count : '1'},
      {barcode: 'ITEM000005', count : '2'}
    ];


    const loadedItems = defaultPos.retrieveLoadItems(tags);

    const expectText = [
      {
        barcode: 'ITEM000003',
        name: 'Litchi',
        unit: 'pound',
        price: 15.00
      },
      {
        barcode: 'ITEM000005',
        name: 'Instant Noodles',
        unit: 'bag',
        price: 4.50
      }];
    
    expect(loadedItems).toStrictEqual(expectText, loadAllItems);
  });

  it('should decode barcode based on the barcode tags given', () => {

    const tags = [
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    const loadedItems = defaultPos.retrieveLoadItems(tags);

    const expectText = [
      {
        barcode: 'ITEM000003',
        name: 'Litchi',
        unit: 'pound',
        price: 15.00,
        count : 2.5
      },
      {
        barcode: 'ITEM000005',
        name: 'Instant Noodles',
        unit: 'bag',
        price: 4.50,
        count : 3
      }
    ];
    
    expect(loadedItems).toStrictEqual(expectText);
  });

  it('should return deducted count based on the promotion', () => {

    const tags = [
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    const loadedItems = defaultPos.calculatePromotion(tags, loadPromotions);

    const expectText = [
      {
        barcode: 'ITEM000003',
        name: 'Litchi',
        unit: 'pound',
        price: 15.00,
        count : 2.5
      },
      {
        barcode: 'ITEM000005',
        name: 'Instant Noodles',
        unit: 'bag',
        price: 4.50,
        count : 2
      }
    ];
    
    expect(loadedItems).toStrictEqual(expectText);
  });

  it('should return deducted total based on the promotion', () => {

    const tags = [
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    const loadedItems = defaultPos.calculatePromotion(tags, loadPromotions);

    const expectText = [
      {
        barcode: 'ITEM000003',
        name: 'Litchi',
        unit: 'pound',
        price: 15.00,
        count : 2.5
      },
      {
        barcode: 'ITEM000005',
        name: 'Instant Noodles',
        unit: 'bag',
        price: 4.50,
        count : 2
      }
    ];
    
    expect(loadedItems).toStrictEqual(expectText);
  });
});
 