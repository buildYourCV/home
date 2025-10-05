class InnerVariables {
    byte b;
    short s;
    long lVal;
    int i;
    String str;
    float fVal;
    double dVal;
    char c;
    boolean flag;

    public InnerVariables(){
        System.out.println(b+" "+s+" "+lVal+" "+i+" "+str+" "+fVal+" "+dVal+" "+c+" "+flag);
    }

    public int doubleToIntConversion(double input){
        return (int) input;
    }
    
}

public class Variables {
    public static void main(String[] args){
        InnerVariables ivObj =new InnerVariables();
        int i = ivObj.doubleToIntConversion(7.99);
        System.out.println(i);
    }
}
