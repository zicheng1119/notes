---
epoch: 1779891577335
modelKey: "deepseek-v4-pro|deepseek"
topic: "Math Formatting and Sketch Instructions"



tags:
  - copilot-conversation
---

**user**: 帮我调整好数学格式，并告诉我sketch都该怎么画 
[Context: Notes: 场波第十次作业.md]
[Timestamp: 2026/05/27 22:19:37]

**ai**: 
<errorChunk>Invalid Copilot Plus license key. Please check your license key in settings.</errorChunk>
[Timestamp: 2026/05/27 22:19:37]

**user**: 帮我调整好数学格式，并告诉我sketch都该怎么画
[Context: Notes: 场波第十次作业.md]
[Timestamp: 2026/05/27 22:20:02]

**ai**: 我已经把笔记里的数学公式调整成了标准的 $\LaTeX$ 格式，去掉了多余的乱码，并对每个 Sketch 给出了具体的画法说明。

### 整理后的数学内容

**P2.1**

For extraordinary wave in a uniaxial medium,
$$\frac{k_x^2}{\varepsilon_z}+\frac{k_z^2}{\varepsilon}=\omega^2\mu$$

Let the optic axis be $z$. Then
$$\tan\theta_1=\frac{k_x}{k_z}$$

The Poynting vector is along the group velocity:
$$\langle \mathbf S\rangle \parallel \nabla_{\mathbf k}\omega$$

So from the dispersion relation,
$$\langle \mathbf S\rangle \parallel \left( \frac{k_x}{\varepsilon_z}, \frac{k_z}{\varepsilon} \right)$$

Thus
$$\tan\theta_2 = \frac{k_x/\varepsilon_z}{k_z/\varepsilon} = \frac{\varepsilon}{\varepsilon_z}\tan\theta_1$$

Since the medium is negative uniaxial,
$$\varepsilon_z<\varepsilon \quad\Rightarrow\quad \frac{\varepsilon}{\varepsilon_z}>1$$

Hence
$$\boxed{\theta_2>\theta_1}$$
and
$$\boxed{ \theta_2= \tan^{-1} \left( \frac{\varepsilon}{\varepsilon_z}\tan\theta_1 \right) }$$

**P2.2 (c)**

For a wave plate, there should be no absorption, so the electric field should not have a $z$-component.

Choose
$$\boxed{w=z,\qquad u=x,\qquad v=y}$$
Then the field is in the $x-y$ plane.

The refractive indices are
$$n_x=\sqrt{12}=2\sqrt3,\qquad n_y=1$$

Thus
$$\beta_x=2\sqrt3 k_0,\qquad \beta_y=k_0$$
$$\Delta\beta=\beta_x-\beta_y=(2\sqrt3-1)k_0$$

For circular polarization, the two components need equal amplitudes and phase difference $\pi/2$. Choose
$$\boxed{ \mathbf E_{\text{inc}} = \frac{E_0}{\sqrt2} (\hat{\mathbf x}+\hat{\mathbf y}) }$$

Then
$$\Delta\beta\, d=\frac{\pi}{2}\;\Longrightarrow\;(2\sqrt3-1)k_0d=\frac{\pi}{2}$$

So
$$d= \frac{\pi}{2(2\sqrt3-1)k_0}$$
Using $k_0=\frac{2\pi}{\lambda_0}$,
$$\boxed{ d_{\min} = \frac{\lambda_0}{4(2\sqrt3-1)} }$$

At $w=d$,
$$\mathbf E_{\text{out}} = \frac{E_0}{\sqrt2} (i\hat{\mathbf x}+\hat{\mathbf y})$$
With time factor $e^{-i\omega t}$,
$$\mathbf E_{\text{out}}(t) = \frac{E_0}{\sqrt2} (\hat{\mathbf x}\sin\omega t+\hat{\mathbf y}\cos\omega t)$$
So $\mathbf E$ rotates from $+\hat{\mathbf y}$ toward $+\hat{\mathbf x}$.

---

### Sketch 画法说明

**1. P2.1 的 $\theta_2$–$\theta_1$ 曲线**

- 画一个平面直角坐标系，横轴是 $\theta_1$，纵轴是 $\theta_2$，范围都取 $0$ 到 $\pi/2$。
- 先画一条对角线 $\theta_2 = \theta_1$，作为参考（虚线或淡色线）。
- 再画实际的关系曲线：  
  曲线应该始终在对角线**上方**（因为 $\frac{\varepsilon}{\varepsilon_z}>1$，使得 $\tan\theta_2 > \tan\theta_1$，从而 $\theta_2 > \theta_1$）。
- 曲线形状：  
  从原点 $(0,0)$ 开始，向上弯曲，随着 $\theta_1$ 增大，$\theta_2$ 也增大，当 $\theta_1 \to \pi/2$ 时，$\theta_2 \to \pi/2$。  
  特性是曲线接近 $\theta_1$ 较大时更陡峭，但始终单调上升。
- 标注：  
  在图上标出 $\theta_1$、$\theta_2$、对角线 $\theta_2=\theta_1$，以及介质的条件 $\varepsilon_z<\varepsilon$。

原 ASCII 图可以大致理解为：
```
theta2
  |π/2 |               *
  |               *
  |           *
  |       *
  |   *
  0 +------------------------ theta1
    0                     π/2
```
你只需要在这个骨架的基础上画出平滑曲线即可。

---

**2. P2.2 (c) 的偏振旋转示意**

- 画一个 $x-y$ 平面坐标，标出 $+x$ 轴（水平向右）和 $+y$ 轴（竖直向上）。
- 在坐标原点处，用箭头表示电场矢量 $\mathbf E$：
  - $t=0$ 时，$\mathbf E(0) \propto \hat{\mathbf y}$，箭头指向正上方，标注 $t=0$。
  - 随着时间增加，$\mathbf E(t)$ 从 $+y$ 向 $+x$ 旋转（逆时针），当 $\omega t = \pi/2$ 时，$\mathbf E$ 指向 $+x$；继续旋转会指到 $-y$ 方向。
- 画一个圆形轨迹（虚线圆）表示矢量不断旋转，并在圆周上用箭头和 $t=0$ 等标注几个时刻的方向。
- 可以用文字说明：从 $+y$ 向 $+x$ 旋转（左手螺旋？根据 $\sin\omega t$ 和 $\cos\omega t$，当 $t$ 增加时，相位从指向 $y$ 到指向 $x$，是逆时针，即左旋圆偏振）。

原 ASCII 图：
```
        +y
         ↑  t=0
         |
 -x -----+----- +x
         |
        -y
```
你可以在此基础上加上旋转箭头和圆轨迹。

如果需要进一步美化，可以用手绘或软件绘制，上述说明已足够指导作图。

#### Sources
[^1]: [[场波第十次作业]] (P2.1)
[^2]: [[场波第十次作业]] (P2.2(c))
[Timestamp: 2026/05/27 22:21:26]

**user**: 帮我直接写入文件中
[Context: Notes: 场波第十次作业.md]
[Timestamp: 2026/05/27 22:22:11]

**ai**: 
<errorChunk>Something went wrong. Please check if you have set your API key.
Path: Settings > copilot plugin > Basic Tab > Set Keys.
Or check model config
Error Details: API key is not provided for the embedding model: openai/text-embedding-3-small|openrouterai</errorChunk>
[Timestamp: 2026/05/27 22:22:17]

**user**: 帮我直接写入文件中
[Context: Notes: 场波第十次作业.md]
[Timestamp: 2026/05/27 22:22:34]

**ai**: 
<errorChunk>Database is not loaded. Please restart the plugin.</errorChunk>
[Timestamp: 2026/05/27 22:23:03]