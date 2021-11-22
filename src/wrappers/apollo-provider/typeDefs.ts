// import * as home from '@/pages/home/schema';
// import * as orders from '@/pages/orders/schema';
// import * as addProduct from '@/pages/addProduct/schema';
// import * as login from '@/pages/login/schema';
// import * as audience from '@/pages/audiences/schema';

// export default `
//   // ${home.TYPE_DEFAULT}
//   // ${orders.TYPE_DEFAULT}
//   // ${addProduct.TYPE_DEFAULT}
//   // ${login.TYPE_DEFAULT}

export default `
  # 比较运算
  input input__conditionalOperation {
    "等于"
    eq: Float
    "大于"
    gt: Float
    "大于等于"
    gte: Float
    "小于"
    lt: Float
    "小于等于"
    lte: Float
  }
`;
