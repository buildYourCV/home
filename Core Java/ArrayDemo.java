import java.util.Arrays;

public class ArrayDemo {

    static void reverseArray(){
        int[] arr = {0,1,2,3,4,5,6,7,8,9};
        int[] rev = new int[arr.length];
        int k=0;
        for(int i= arr.length-1; i>=0; i--){
            rev[k] = arr[i];
            k++;
        }
        System.out.println(Arrays.toString(arr));
        System.out.println(Arrays.toString(rev));
    }

    static void twoDArrayDemo(){
        // int[][] arr = new int[5][5];
        int[][] arr = {
            {1,2,3,4,5},
            {1,2,3,4,5},
            {1,2,3,4,5},
            {1,2,3,4,5},
            {1,2,3,4,5}
        };
        int sum =0;
        for(int i=0; i< arr.length; i++){
            for(int j=0; j<arr[i].length; j++){
                sum +=arr[i][j]; 
            }
        }
        System.out.println(sum);

    }
    static void jaggedArray(){
        int[][] arr = new int[3][];
        arr[0] = new int[1];
        arr[1] = new int[2];
        arr[2] = new int[1];

        arr[0][0] = 85;
        arr[1][0] = 65;
        arr[1][1] = 75;
        arr[2][0] = 45;
        int sum =0;
         for(int i=0; i< arr.length; i++){
            for(int j=0; j<arr[i].length; j++){
                sum +=arr[i][j]; 
            }
        }
        System.out.println(sum);


    }

    public static void main(String[] args){
        int[] arr ={7,3,9,2,8,5};
        int sum =0;
        for(int i=0; i< arr.length;i++){
            sum +=arr[i];
        }
        System.out.println(sum);
        System.out.println((double) sum / arr.length);
        reverseArray();
        twoDArrayDemo();
        jaggedArray();
    }
    
}
