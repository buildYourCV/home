class Parent {
    Parent(String s1){
        System.out.println("Parent constructor " + s1);
    }
    public void pMsg(){
        System.out.println("Hello");
    }
}

class Child extends Parent {

    Child(String s2){
        super("AA");
        System.out.println("Child constructor "+s2);
    }

   public void cMsg(){
    System.out.println("World!!");
   } 
}

class GChild extends Child {

    GChild(){
        super("CCC");
    }

    public void gCMsg(){
        System.out.println("Ram");
    }
}

public class Inheritance {
    public static void main(String[] args){
        GChild c = new GChild();
        c.pMsg();
        c.cMsg();
        c.gCMsg();

    }
}
