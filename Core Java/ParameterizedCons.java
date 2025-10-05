class InnerParameterizedCons{
    public InnerParameterizedCons(int i, double d, float f, char c, String s){
        System.out.println(s);
        System.out.println(i);
        System.out.println(d);
        System.out.println(f);
        System.out.println(c);
    }
}
public class ParameterizedCons {
    public static void main(String[] str){
        InnerParameterizedCons o1= new InnerParameterizedCons(0, 0, 0, 'A', null);

    }
}
