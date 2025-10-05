package package2;

public class p2 {
    String str1 = "default from package2 p2";
    public String str = "public from Package2 p2 class";
    protected String dStr = "protected from Package2 p2 class";
    public String getP2Msg(){
        System.out.println("Printing inside package2 as it cant be accessed outside package2 : - "+str1);
        return "Hello from p2";
    }
}
