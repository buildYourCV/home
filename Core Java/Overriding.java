class Parent {
    public void getSquare() {
        System.out.println("From P");
    }
    public void A(){
        System.out.println("A");
    }
}

class Child extends Parent {
    @Override
    public void getSquare() {
       System.out.println("From C");
    }
     public void B(){
        System.out.println("B");
    }
}

public class Overriding {
    public static void main(String[] args) {
        Parent p = new Child();
        p.A();
        p.getSquare();
    }

}
