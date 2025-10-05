class Calculator {

    public int add(int n1, int n2){
        return n1+n2;
    }
}

public class Demo {
    public static void main(){
        Calculator calcObj= new Calculator();
        System.err.println("Hello World!!");
        System.out.println(calcObj.add(10, 20));
    }
}
