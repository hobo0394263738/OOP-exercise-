//Value Assignment 1 of
    n1.i: 5
 Trong đoạn mã này, n1 và n2 vẫn là hai đối tượng riêng biệt trong suốt chương trình.
 Các thay đổi đối với n2.i sau khi gán nó cho n1.i sẽ không ảnh hưởng đến n1.i.


// Value Assignment 2 :
   n1.i: 20
   n2.i: 20
Trong đoạn mã này, n1 và n2 cuối cùng sẽ trỏ đến cùng một đối tượng sau dòng lệnh n1 = n2;. 
Do đó, bất kỳ thay đổi nào đối với n1.i hoặc n2.i sẽ ảnh hưởng đến cả hai, vì chúng thực chất là cùng một đối tượng.
