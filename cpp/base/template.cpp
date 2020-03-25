// 模板举例

#include <iostream>
using namespace std;

template <typename T>
inline T const& Max(T const& a, T const& b) {
  return a < b ? b : a;
}

int main() {
  double* pvalue = NULL;  // 初始化为 null 的指针
  pvalue = new double;    // 为变量请求内存

  *pvalue = 29494.99;  // 在分配的地址存储值
  cout << "Value of pvalue : " << *pvalue << endl;

  delete pvalue;  // 释放内存

  // 模版, 范型
  int i = 39;
  int j = 20;
  cout << "Max(i, j): " << Max(i, j) << endl;  // 39
  return 0;
}
