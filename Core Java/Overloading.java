class InnerOverloading{
    public int calculate(){
        return 5*5;
    }
    public double calculate(int i, double d){
        return i*d;
    }
}
public class Overloading {
    public static void main(String[] str){
        InnerOverloading o1 = new InnerOverloading();
        System.out.println(o1.calculate());
        System.out.println(o1.calculate(5, 6.5));
    }
}
