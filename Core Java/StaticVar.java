class InnerStaticVar {
    static int objCount = 0;

    InnerStaticVar(){
        objCount++;
    }
    public int getObjCount(){
        return objCount;
    }

    static int squareCalculation(int i){
        return i*i;
    }
}

public class StaticVar {
    public static void main(String[] args){
        InnerStaticVar o1 = new InnerStaticVar();
        InnerStaticVar o2 = new InnerStaticVar();
        InnerStaticVar o3 = new InnerStaticVar();
        InnerStaticVar o4 = new InnerStaticVar();
        InnerStaticVar o5 = new InnerStaticVar();
        System.out.println(o1.getObjCount());
        System.out.println(InnerStaticVar.squareCalculation(5));
    }
}
