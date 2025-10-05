class InnerGetterSetter {
    private int age;
    private String name;
    public void setAge(int age){
        this.age =age;
    }
    public void setName(String n){
        name = n;
    }
    public int getAge(){
        return age;
    }
    public String getName(){
        return name;
    }
    
}

public class GetterSetter {
    public static void main(String[] str){
        InnerGetterSetter o1= new InnerGetterSetter();
        o1.setAge(30);
        System.out.println(o1.getAge());
        o1.setName("AAA");
        System.out.println(o1.getName());
    }
    
}
