import package2.*;

class InnerAccessModifier extends p2{
    public void readProtected(){
        System.out.println(dStr);
        getP2Msg();
    }

    public static void readProtectedFromStatic(InnerAccessModifier o){
        System.out.println("from static method :- "+o.dStr);
        o.getP2Msg();
    }
    
}

public class AccessModifier {
    private String str = "Private from this class";
    public static void main(String[] args){
        p2 o= new p2();
        System.out.println(o.str);
        AccessModifier aO= new AccessModifier();
        System.out.println(aO.str);
        InnerAccessModifier iO = new InnerAccessModifier();
        iO.readProtected();
        InnerAccessModifier.readProtectedFromStatic(iO);
    }
}
