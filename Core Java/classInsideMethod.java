public class classInsideMethod {
    public static void main(){
        class A {
            void m1(){
                System.out.println("m1");
            }
            
        }
        A o = new A();
        o.m1();
    }
}
