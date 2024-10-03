public class Assignment2 {
    public static void main(String[] args) {
      Number n1 = new Number();
      Number n2 = new Number();
      n1.i = 2;
      n2.i = 5;
      n1 = n2;
      n2.i = 10; // what is n1.i?
      n1.i = 20; // what is n2.i?
    }
   }
   