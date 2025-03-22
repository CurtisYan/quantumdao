# 工具函数库

## Canvas辅助函数库 (canvas-helpers.ts)

这个辅助函数库提供了类型安全的canvas操作方法，解决TypeScript中常见的"canvas is possibly null"错误。

### 如何使用

以下是使用示例：

```typescript
import { 
  safeCanvasWidth, 
  safeCanvasHeight, 
  resizeCanvasToWindow, 
  checkBoundaries,
  clearCanvas 
} from '../lib/canvas-helpers';

// 在组件中使用
function MyCanvasComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 安全地调整canvas大小
    resizeCanvasToWindow(canvas);
    
    // 粒子类示例
    class Particle {
      x: number;
      y: number;
      speedX: number;
      speedY: number;
      
      constructor() {
        // 使用安全的canvas尺寸函数
        this.x = Math.random() * safeCanvasWidth(canvas);
        this.y = Math.random() * safeCanvasHeight(canvas);
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // 使用安全的边界检查
        checkBoundaries(this.x, this.y, canvas, (hitX, hitY) => {
          if (hitX) this.speedX *= -1;
          if (hitY) this.speedY *= -1;
        });
      }
      
      draw() {
        // 绘制逻辑
      }
    }
    
    function animate() {
      // 安全地清除canvas
      clearCanvas(ctx, canvas);
      
      // 动画逻辑
      requestAnimationFrame(animate);
    }
    
    animate();
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
```

### 功能说明

- `safeCanvasWidth` / `safeCanvasHeight`: 安全获取canvas尺寸，提供默认值
- `resizeCanvasToWindow`: 调整canvas大小以匹配窗口
- `checkBoundaries`: 安全进行边界检查，常用于粒子动画
- `clearCanvas`: 安全清除canvas内容

### 为什么使用这个库

在TypeScript中，使用canvas时常见的问题是"canvas is possibly null"错误。这个库提供了类型安全的函数，避免这些错误，使代码更加健壮。

未来开发新的canvas动画时，强烈建议使用这个辅助函数库，而不是直接访问canvas属性。 