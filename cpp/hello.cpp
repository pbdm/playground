// http://www.runoob.com/cplusplus/cpp-tutorial.html
// 编译方法: g++ hello.cpp 或 clang++ hello.cpp
// 引用头文件
#include <iostream>
// 使用 std 命名空间
using namespace std;

extern int d, f; // extern 标示变量或者函数的定义在别的文件中，提示编译器遇到此变量和函数时在其他模块中寻找其定义
void func(void);
int max(int, int);
static int co = 10; /* 全局变量 */
#include <iomanip>
using std::setw;
int e;

int main()
{
  // << 后面跟了需要打印的内容, endl 为换行
  // 因为已经在 ste namespace 内了, 所以不需要 std::count
  cout << setw(7) << "变量类型"<< endl;
  cout << "Size of char : " << sizeof(char) << endl; // 1
  cout << "Size of int : " << sizeof(int) << endl; //4
  cout << "Size of short int : " << sizeof(short int) << endl; //2
  cout << "Size of long int : " << sizeof(long int) << endl; // 8
  cout << "Size of float : " << sizeof(float) << endl; // 4
  cout << "Size of double : " << sizeof(double) << endl; // 8
  cout << "Size of wchar_t : " << sizeof(wchar_t) << endl; // 4
  
  // 枚举, 如果没有特定赋值, 则依次累加
  cout << "枚举"<< endl;
  // 变量 c 的类型为 color
  enum color { red, green = 5, blue } c;

  c = blue;
  // 默认情况下，每个名称都会比它前面一个名称大 1
  cout << c << endl; // 6
  c = red;
  // 但 red 的值依然为 0
  cout << c << "\n"; // 0

  int d = 0;
  cout << d << endl; // 0
  cout << e << endl; // 0
  cout << "hello, ""d" "ear\n";

  // 常量
  #define LENGTH 10
  const int WIDTH  = 5;
  cout << LENGTH << endl; // 10
  cout << WIDTH << endl; // 5

  // 修饰符
  // http://www.runoob.com/cplusplus/cpp-modifier-types.html
  short int i;           // 有符号短整数
  short unsigned int j;  // 无符号短整数
  j = 50000;
  i = j;
  cout << i << " " << j << endl; // -15536 50000

  // static 存储类
  while(co--)
  {
    func();
  }

  // 数组
  double balance[5] = {1000.0, 2.0, 3.4, 17.0, 50.0};
  cout << balance[0] << endl; // 1000
  // *(balance + 1) 是一种访问 balance[1] 数据的合法方式
  cout << *(balance + 1) << endl; // 2
  int arr[3][4] = {  
    {0, 1, 2, 3} ,   /*  初始化索引号为 0 的行 */
    {4, 5, 6, 7} ,   /*  初始化索引号为 1 的行 */
    {8, 9, 10, 11}   /*  初始化索引号为 2 的行 */
  };
  cout << arr[2][3] << endl; // 11
  cout << *(*(arr + 1) + 2) << endl; // 6
  printf("*(balance + %d) : %f\n",  2, *(balance + 2) ); // *(balance + 2) : 3.400000

  // 字符串
  char greeting[6] = {'H', 'e', 'l', 'l', 'o', '\0'};
  cout << greeting << endl; // Hello
  cout << greeting[1] << endl; // e

  // 指针
  int  var1;
  cout << "var1 变量的地址： ";
  cout << &var1 << endl;
  int var = 20;   // 实际变量的声明
  int *ip;
  ip = &var; // 在指针变量中存储 var 的地址
  cout << *ip << endl; // 20

  // 空指针
  int *ptr = NULL; // 或直接 int *ptr
  cout << "ptr 的值是 " << ptr << endl; // 0x0
  cout << (ptr == NULL)<< endl; // 1
  ptr++;
  cout << "ptr 的值是 " << ptr << endl; // 0x4  4 个字节为一个整数位置

  double *pt = balance;
  cout << "pt 的值是 " << pt << endl;
  cout << "pt 指向的值是 " << *pt << endl; // balance[0]
  *balance = 5; // balance[0]
  cout << balance[0] << endl; // 5

  // 指针的指针（多级间接寻址）
  int **va;
  cout << "va: " << va << endl; 
  cout << "&va: "<< &va << endl;

  // 引用(相当于别名)
  int t = 17;
  int& r = t;
  cout << "r: "<< r << endl;
  cout << "&r: "<< &r << endl;
  
  /* 标准输入流
  char name[50];
  cout << "请输入您的名称： ";
  cin >> name;
  cout << "您的名称是： " << name << endl;
  */

  // 结构体
  struct Books
  {
    char  title[50];
    char  author[50];
    char  subject[100];
    int   book_id;
  };

  struct Books *struct_pointer;
  struct Books Book;
  struct_pointer = &Book;
  // 复制字符串
  strcpy( Book.title, "Learn C++ Programming");
  cout << Book.title << endl;
  cout << struct_pointer->title << endl;

  // typedef: 定义类型的别名
  return 0;
}

void func( void )
{
  // 程序的生命周期内保持局部变量的存在, 而不需要在每次它进入和离开作用域时进行创建和销毁(和闭包有点像..)
  static int i = 5; // 局部静态变量
  i++;
  std::cout << "i is " << i ;
  std::cout << " and count is " << co << std::endl;
}
